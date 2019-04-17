import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import MainTheme from '@screen/partial/MainTheme';
import Header from '@screen/partial/Header';
import lsProNoteSts from '@assets/styles/list-pro-note.js';
import { TextBox, Button } from '@screen/partial/Component';
import * as constSts from '@constants/style';
import { apiGetProduct } from '@api/product';
import {
    API_ADMIN_URL
} from '@constants/api';

export default class ListProNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            products: []
        }
    }

    componentDidMount() {

    }

    _getProduct() {
        apiGetProduct(this.state.search).then(res => {
            if (res == "success") {
                this.setState({ products: res.data });
            }
        })
    }

    render() {
        var products = this.state.products;
        return (
            <MainTheme style={lsProNoteSts.container}>
                <Header navigation={this.props.navigation} isBack />
                <ScrollView style={lsProNoteSts.container} contentContainerStyle={{
                    justifyContent: "space-between", flexGrow: 1
                }} >
                    <View style={lsProNoteSts.vHeader}>
                        <View style={lsProNoteSts.vHeaderField}>
                            <Text style={lsProNoteSts.txtHeader}>SMart Reminder</Text>
                        </View>
                    </View>
                    <View style={lsProNoteSts.vContent}>
                        <View style={lsProNoteSts.vPersonal}>
                            <Text style={lsProNoteSts.txtPersonal}>Danh sách sản phẩm</Text>
                        </View>
                        <View style={lsProNoteSts.vBody}>
                            <View style={lsProNoteSts.vSearchBar}>
                                <TextBox placeholder="Nhập tên sản phẩm tìm kiếm"
                                    value={this.state.search}
                                    style={lsProNoteSts.textBox}
                                    onChangeText={(value) => { this.setState({ search: value }) }} />
                                <TouchableOpacity onPress={() => { }}
                                    style={lsProNoteSts.btnSearch}>
                                    <Icon name={"search"} size={25} color={constSts.COLOR_WHITE} />
                                </TouchableOpacity>
                            </View>
                            <View style={lsProNoteSts.vProductList}>
                                {products.map((item)=>{
                                    return (
                                        <View>
                                            <View style={lsProNoteSts.vProType}>
                                                <Text style={lsProNoteSts.txtProType}>{item.product_type_name}</Text>
                                            </View>
                                            <View style={lsProNoteSts.vPro}>
                                                {item.product.map((pro)=>{
                                                    return (
                                                        <View style={lsProNoteSts.vProItem}>
                                                            <Image source={{uri : API_ADMIN_URL +"/"+ pro.p_image}}/>
                                                        </View>
                                                    );      
                                                })}
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </MainTheme>
        )
    }
}