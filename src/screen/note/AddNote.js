import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import CheckBox from 'react-native-check-box';

import MainTheme from '@screen/partial/MainTheme';
import Header from '@screen/partial/Header';
import addNoteSts from '@assets/styles/add-note.js';
import { TextBox, Button } from '@screen/partial/Component';
import * as constSts from '@constants/style';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note_description: "",
            notification_date: "",
            notification_time: "",
            isNotify: false,
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            error: {}
        }
    }
    static navigationOptions = {
        header: null,
        headerLeft: null, gesturesEnabled: false,
    };

    _goToListPro(){
        this.props.navigation.navigate("ListProNote");

    }

    render() {
        const error = this.state.error;
        return (
            <MainTheme style={addNoteSts.container}>
                <Header navigation={this.props.navigation} isBack />
                <ScrollView style={addNoteSts.container} contentContainerStyle={{
                    justifyContent: "space-between", flexGrow: 1
                }} alwaysBounceVertical={false}>
                    <View style={addNoteSts.vHeader}>
                        <View style={addNoteSts.vHeaderField}>
                            <Text style={addNoteSts.txtHeader}>SMart Reminder</Text>
                        </View>
                    </View>
                    <View style={addNoteSts.vContent}>
                        <View style={addNoteSts.vPersonal}>
                            <Text style={addNoteSts.txtPersonal}>Thêm Ghi chú</Text>
                        </View>
                        <View style={addNoteSts.vBody}>
                            <View style={addNoteSts.vReminder}>
                                <View style={addNoteSts.vLabel}>
                                    <Text style={addNoteSts.txtLabel}>Nội dung </Text>
                                </View>
                                <TextBox placeholder="Nội dung"
                                    value={this.state.note_description}
                                    multiline={true}
                                    errorMessage={(error.hasOwnProperty("note_description")) ? this.state.error.note_description[0] : null}
                                    style={addNoteSts.textBox}
                                    onChangeText={(value) => { this.setState({ note_description: value }) }} />
                                <View style={addNoteSts.vDateTime}>
                                    <View style={addNoteSts.vDay}>
                                        <View style={addNoteSts.vLabel}>
                                            <Text style={addNoteSts.txtLabel}>Ngày tháng </Text>
                                        </View>
                                        <TouchableOpacity style={addNoteSts.btnReminder} onPress={() => { this.setState({ isDatePickerVisible: true }) }}>
                                            <Icon name={"calendar"} size={15} color={constSts.COLOR_BLACK} />
                                            <Text style={addNoteSts.txtReminderTime}>{(this.state.notification_date != "") ? this.state.notification_date : "Chọn ngày"}</Text>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            minimumDate={new Date()}
                                            isVisible={this.state.isDatePickerVisible}
                                            mode={"date"}
                                            onConfirm={(date) => { this.setState({ notification_date: moment(date).format("DD/MM/YYYY"), isDatePickerVisible: false }) }}
                                            onCancel={() => { this.setState({ isDatePickerVisible: false }) }}
                                        />
                                    </View>
                                    <View style={addNoteSts.vHour}>
                                        <View style={addNoteSts.vLabel}>
                                            <Text style={addNoteSts.txtLabel}>Giờ</Text>
                                        </View>
                                        <TouchableOpacity style={addNoteSts.btnReminder} onPress={() => { this.setState({ isTimePickerVisible: true }) }}>
                                            <Icon name={"clock-o"} size={15} color={constSts.COLOR_BLACK} />
                                            <Text style={addNoteSts.txtReminderTime}>{(this.state.notification_time != "") ? this.state.notification_time : "Chọn Giờ"}</Text>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            isVisible={this.state.isTimePickerVisible}
                                            mode={"time"}
                                            onConfirm={(hour) => { this.setState({ notification_time: moment(hour).format("HH:mm:ss"), isTimePickerVisible: false }) }}
                                            onCancel={() => { this.setState({ isTimePickerVisible: false }) }}
                                        />
                                    </View>
                                </View>

                                <CheckBox
                                    style={{ flex: 1, paddingVertical: 5, borderRadius: 5 }}
                                    checkBoxColor={constSts.COLOR_MAIN}
                                    uncheckedCheckBoxColor={constSts.COLOR_GRAY}
                                    onClick={() => {
                                        // this._toggleCompanyForm();
                                        this.setState({ isNotify: !this.state.isNotify })
                                    }}
                                    isChecked={this.state.isNotify}
                                    rightTextStyle={{ fontSize: 14,color:constSts.COLOR_BLACK }}
                                    rightText={"Bật thông báo"}
                                />
                            </View>
                            <View style={addNoteSts.vProPick}>
                                <Button style={addNoteSts.btnProPick} onPress={()=>{this._goToListPro()}}>
                                    <AntIcon name={"plus"} size={20} color={constSts.COLOR_WHITE}/>
                                    <Text style={addNoteSts.txtProPick}>CHỌN SẢN PHẨM</Text>
                                </Button>
                            </View>
                            <View style={addNoteSts.vProList}>
                                <View style={addNoteSts.vNoPro}>
                                    <Text style={addNoteSts.txtNoPro}>Chưa chọn sản phẩm</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </MainTheme>
        );
    }
}