import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, TextInput,Platform } from 'react-native';
import { connect } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';
import ModalSelector from 'react-native-modal-selector';
import ImagePicker from 'react-native-image-crop-picker';

import MainTheme from '@screen/partial/MainTheme';
import SModal from '@screen/partial/SModal';
import Header from '@screen/partial/Header';
import accountSts from '@assets/styles/account.js';
import { TextBox, Button } from '@screen/partial/Component';
import * as constApi from '@constants/api';
import images from '@assets/images';
import * as constSts from '@constants/style';
import validateForm from '@validators';
import updateRule from '@validators/updateRule';
import {
    API_BASE_URL
} from '@constants/api';

import { apiGetUser, apiUpdateUser, apiUpdateUserAvatar } from '@api/account';
import { apiGetDistrict, apiGetWard } from '@api/location';
import { actGetProvince } from '@reducers/actions/global';
import { actSetUser } from '@reducers/actions/auth';

class Account extends Component {
    static navigationOptions = {
        header: null,
        headerLeft: null, gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            Name: "",
            Email: "",
            Phone: "",
            Avatar: null,
            Address: null,
            CityId: null,
            DistrictId: null,
            WardId: null,
            gender: 1,
            listDistrict: [
                { key: "", label: "Chọn quận/huyện" }
            ],
            listWard: [
                { key: "", label: "Chọn phường/xã" }
            ],
            listGender: [
                {
                    label: 'Nam',
                    value: "1",
                    color: constSts.COLOR_MAIN,
                },
                {
                    label: 'Nữ',
                    value: "0",
                    color: constSts.COLOR_MAIN,
                },
            ],
            error: {},
            modalMessage: "",
            modalTitle: "",
            modalError: false
        };
    }

    componentDidMount() {
        this._getUser();
        if (this.props.province.length == 1) {
            this.props._getProvince();
        }
    }

    _getUser() {
        const user = this.props.user;
        apiGetUser(user.jwt_string).then(res => {
            if (res.status == constApi.API_SUCCESS) {
                if (res.data.CityId != null && res.data.CityId !== "") {
                    this._getDistrict(res.data.CityId, true);
                }

                if (res.data.DistrictId != null && res.data.DistrictId !== "") {
                    this._getWard(res.data.DistrictId, true);
                }
                this.setSelectedGender(res.data.gender)

                this.setState({
                    user_id: res.data.user_id,
                    Name: res.data.Name,
                    Email: res.data.Email,
                    Phone: res.data.Phone,
                    Avatar: API_BASE_URL + res.data.Avatar,
                    Address: res.data.Address,
                    CityId: res.data.CityId,
                    DistrictId: res.data.DistrictId,
                    WardId: res.data.WardId,
                    gender: res.data.gender
                })
            }
        });
    }

    chooseGender(data) {
        var that = this;
        data.forEach(function (item) {
            if (item.selected) {
                that.setState({ gender: (item.value == "1") ? 1 : 0 });
            }
        });
    }

    setSelectedGender(value) {
        var gender = this.state.listGender;
        if (value == 1) {
            gender[0].selected = true;
            gender[1].selected = false;
        } else {
            gender[0].selected = false;
            gender[1].selected = true;
        }
        this.setState({ listGender: gender });
    }

    _openGallery() {
        var user = this.props.user;
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            multiple: false,
            mediaType: "photo"
        }).then(image => {
            console.log(image);
            // this.setState({ Avatar: image.path });
            apiUpdateUserAvatar(this._createFormData(image),user.jwt_string).then(res=>{
                if(res.status == "success"){
                    console.log(res.data.image_path);
                    this.setState({
                        Avatar:API_BASE_URL + res.data.image_path,
                        modalMessage: "Lưu Avatar thành công",
                        modalTitle: 'Thành công',
                        modalError: true
                    });

                    user.avatar = res.data.image_path
                    this.props._setAvatarUser(user);
                }
            });
        }).catch(e => {
            console.log(e);
        });
    }

    _createFormData(photo) {
        const data = new FormData();

        data.append("avatar", {
            name: photo.path.substring(photo.path.lastIndexOf('/')+1),
            type: photo.mime,
            uri:
                Platform.OS === "android" ? photo.path : photo.path.replace("file://", "")
        });

        return data;
    }

    render() {
        const province = this.props.province;
        const districts = this.state.listDistrict;
        const wards = this.state.listWard;
        const error = this.state.error;
        return (
            <MainTheme style={accountSts.container}>
                <Header navigation={this.props.navigation} isBack />
                <ScrollView style={accountSts.container} contentContainerStyle={{
                    justifyContent: "space-between", flexGrow: 1
                }} alwaysBounceVertical={false}>
                    <View style={accountSts.vHeader}>
                        <View style={accountSts.vHeaderField}>
                            <Text style={accountSts.txtHeader}>THÔNG TIN CÁ NHÂN</Text>
                        </View>
                    </View>
                    <View style={accountSts.vContent}>
                        <View style={accountSts.vAvatar}>
                            <TouchableOpacity style={accountSts.btnAvatar} onPress={() => { this._openGallery() }}>
                                <Image source={(this.state.Avatar != null) ? { uri: this.state.Avatar } : images.user} style={accountSts.imgAvatar} />
                            </TouchableOpacity>
                        </View>
                        <View style={accountSts.vUserInfo}>
                            <View style={accountSts.vLabel}>
                                <Text style={accountSts.txtLabel}>Họ Tên </Text>
                            </View>
                            <TextBox placeholder="Họ Tên"
                                value={this.state.Name}
                                errorMessage={(error.hasOwnProperty("Name")) ? this.state.error.Name[0] : null}
                                style={accountSts.textBox}
                                onChangeText={(value) => { this.setState({ Name: value }) }} />
                            <View style={accountSts.vLabel}>
                                <Text style={accountSts.txtLabel}>Email </Text>
                            </View>
                            <TextBox placeholder="Email"
                                value={this.state.Email}
                                keyboardType="email-address"
                                errorMessage={(error.hasOwnProperty("Email")) ? this.state.error.Email[0] : null}
                                style={accountSts.textBox}
                                onChangeText={(value) => { this.setState({ Email: value }) }} />
                            <View style={accountSts.vLabel}>
                                <Text style={accountSts.txtLabel}>Số điện thoại </Text>
                            </View>
                            <TextBox placeholder="Số điện thoại"
                                value={this.state.Phone}
                                keyboardType="numeric"
                                errorMessage={(error.hasOwnProperty("Phone")) ? this.state.error.Phone[0] : null}
                                style={accountSts.textBox}
                                onChangeText={(value) => { this.setState({ Phone: value }) }} />
                            <View style={accountSts.vLabel}>
                                <Text style={accountSts.txtLabel}>Giới tính </Text>
                            </View>
                            <View style={accountSts.vGender}>
                                <RadioGroup
                                    radioButtons={this.state.listGender}
                                    onPress={(data) => { this.chooseGender(data) }}
                                    flexDirection='row'
                                />
                            </View>
                            <View style={accountSts.vLocation}>
                                <ModalSelector
                                    style={accountSts.vProvince}
                                    data={province}
                                    selectedKey={(this.state.CityId != null) ? this.state.CityId : ""}
                                    onChange={(option) => { this._getDistrict(option.key) }}>
                                    <View style={accountSts.vSelect}>
                                        <Text style={accountSts.txtSelect} numberOfLines={1}>
                                            {(this.state.CityId != null) ? province.map((item) => {
                                                if (item.key == this.state.CityId) {
                                                    return item.label;
                                                }
                                            }) : province[0].label}
                                        </Text>
                                    </View>
                                </ModalSelector>

                                <ModalSelector
                                    style={accountSts.vDistrict}
                                    data={this.state.listDistrict}
                                    selectedKey={(this.state.DistrictId != null) ? this.state.DistrictId : ""}
                                    onChange={(option) => { this._getWard(option.key) }}>
                                    <View style={accountSts.vSelect}>
                                        <Text style={accountSts.txtSelect} numberOfLines={1}>
                                            {(this.state.DistrictId != null) ?
                                                districts.map((item) => {
                                                    if (item.key == this.state.DistrictId) {

                                                        return item.label;
                                                    }
                                                }) : districts[0].label}
                                        </Text>
                                    </View>
                                </ModalSelector>

                                <ModalSelector
                                    style={accountSts.vWard}
                                    data={this.state.listWard}
                                    selectedKey={(this.state.WardId != null) ? this.state.WardId : ""}
                                    onChange={(option) => { this.setState({ WardId: option.key }) }}>
                                    <View style={accountSts.vSelect}>
                                        <Text style={accountSts.txtSelect} numberOfLines={1}>
                                            {(this.state.WardId != null) ?
                                                wards.map((item) => {
                                                    if (item.key == this.state.WardId) {
                                                        return item.label;
                                                    }
                                                }) : wards[0].label}
                                        </Text>
                                    </View>
                                </ModalSelector>
                            </View>
                            <View style={accountSts.vLabel}>
                                <Text style={accountSts.txtLabel}>Địa chỉ </Text>
                            </View>
                            <TextBox placeholder="Nhập địa chỉ"
                                value={this.state.Address}
                                errorMessage={null}
                                style={accountSts.textBox}
                                onChangeText={(value) => { this.setState({ Address: value }) }} />

                        </View>
                        <Button style={accountSts.btnChange} onPress={() => { this._save() }}>
                            <Text style={accountSts.textLogin}>
                                LƯU THAY ĐỔI
                            </Text>
                        </Button>
                    </View>
                </ScrollView>
                <SModal message={this.state.modalMessage} title={this.state.modalTitle} PrimaryText="OK" isOpen={this.state.modalError} haveSecondary={false}
                    onPrimaryPress={() => this.setState({ modalError: false })}></SModal>
            </MainTheme>
        );
    }

    async _save() {

        var data = {
            Name: this.state.Name,
            Email: this.state.Email,
            Phone: this.state.Phone,
            Address: this.state.Address,
            CityId: this.state.CityId,
            DistrictId: this.state.DistrictId,
            WardId: this.state.WardId,
            gender: this.state.gender
        }
        var that = this;
        var validate = validateForm(data, updateRule);

        if (!validate) {
            await this.setState({
                error: {}
            });
            const user = this.props.user;
            console.log(data, user.jwt_string);

            apiUpdateUser(data, user.jwt_string).then(res => {
                if (res.status == "success") {
                    that.setState({
                        modalMessage: "Lưu thông tin thành công",
                        modalTitle: 'Thành công',
                        modalError: true
                    })
                }
            })
        } else {
            await this.setState({
                error: validate
            });
        }
    }

    _getDistrict(provinceid, preload = false) {
        this.setState({ CityId: provinceid })
        apiGetDistrict(provinceid).then(res => {
            if (res.status) {
                var list = [
                    { key: "", label: "Chọn quận/huyện" }
                ];
                list = [...list, ...res.data];
                if (preload) {
                    this.setState({ listDistrict: list });
                } else {
                    this.setState({ listDistrict: list, DistrictId: null, WardId: null });
                }
            }
        });
    }

    _getWard(districtid, preload = false) {
        this.setState({ DistrictId: districtid })
        apiGetWard(districtid).then(res => {
            if (res.status) {
                var list = [
                    { key: "", label: "Chọn phường/xã" }
                ];
                list = [...list, ...res.data];
                if (preload) {
                    this.setState({ listWard: list });
                } else {
                    this.setState({ listWard: list, WardId: null });
                }
            }
        });
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    province: state.global.province,
    error: state.error,
});

function mapDispatchToProps(dispatch) {
    return {
        _getProvince: function () {
            return dispatch(actGetProvince());
        },
        _setAvatarUser : function(user){
            return dispatch(actSetUser(user));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);