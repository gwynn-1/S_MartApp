import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { connect } from 'react-redux';
import Moment from 'moment';

import receiptSts from '@assets/styles/receipt.js';
import Header from '@screen/partial/Header';
import * as constSts from '@constants/style';
import MainTheme from '@screen/partial/MainTheme';
import { apiGetReceipt } from '@api/receipt';
import {
    API_ADMIN_URL
} from '@constants/api';

class Receipt extends Component {
    static navigationOptions = {
        header: null,
        headerLeft: null, gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            collapsed: [],
            refreshing: false,
            page: 1,
            loadMore: false,
            totalPage: 0,
            idChosen: 0,
            receipts: [],
            collapsed: []
        }
    }

    componentDidMount() {
        this._loadReceipt(1);
    }

    _loadReceipt(page) {
        const user = this.props.user;
        apiGetReceipt(user.jwt_string, 1).then(res => {
            if (res.status == "success") {
                let list = res.data.data;
                let collapsed = this.state.collapsed;
                if (page !== 1) {
                    var oldData = this.state.receipts;
                    var newData = list;
                    list = [...oldData, ...newData];
                }
                if (page == 1) {
                    collapsed = [];
                    for (var index in list) {
                        collapsed.push(false);
                    }
                }

                this.setState({
                    receipts: list,
                    page,
                    totalPage: res.data.total,
                    loadMore: false,
                    refreshing: false,
                    collapsed
                });
            }
        });
    }

    toggleExpanded(id, index) {
        const user = this.props.user;
        let list = this.state.receipts;
        let collapsed = this.state.collapsed;
        for (var i in collapsed) {
            if (i == index)
                collapsed[i] = !collapsed[i];
            else
                collapsed[i] = false;
        }
        this.setState({ collapsed }, () => {
            if (list[index].detail == undefined) {
                apiGetReceipt(user.jwt_string, null, id).then(res => {
                    if (res.status == "success") {

                        list[index].detail = res.data;

                        this.setState({
                            receipts: list,
                            loadMore: false,
                            refreshing: false
                        });
                    }
                })
            }
        })
    };

    _renderItem(item, index) {
        const collapsed = this.state.collapsed;
        // console.log(collapsed)
        return (
            <Collapse style={receiptSts.vListItem} key={item.receipt_id} isCollapsed={(collapsed.length > 0) ? collapsed[index] : false} onToggle={(isCollapsed) => { this.toggleExpanded(item.receipt_id, index) }} >
                <CollapseHeader style={receiptSts.vListContent} >
                    <View style={receiptSts.vItemText}>
                        <Text style={receiptSts.txtProduct}>Hóa đơn ngày {Moment(item.created_at, "YYYY-MM-DD HH:mm:ss").format('DD/MM/YYYY')}</Text>
                        <Text style={receiptSts.txtInfo}>Mã đơn hàng : {item.receipt_code}</Text>
                        <View style={receiptSts.vStatusField}>
                            <Text style={receiptSts.txtInfo}>Trạng thái : </Text>
                            {(item.status == "success") ? (
                                <View style={[receiptSts.vStatus, { backgroundColor: constSts.COLOR_GREEN }]}>
                                    <Text style={receiptSts.txtStatus}>Hoàn thành</Text>
                                </View>
                            ) : null}
                            {(item.status == "failed") ? (
                                <View style={[receiptSts.vStatus, { backgroundColor: constSts.COLOR_RED }]}>
                                    <Text style={receiptSts.txtStatus}>Không thành công</Text>
                                </View>
                            ) : null}

                            {(item.status == "pending") ? (
                                <View style={[receiptSts.vStatus, { backgroundColor: constSts.COLOR_YELLOW }]}>
                                    <Text style={receiptSts.txtStatus}>Đang xử lý</Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                    <View style={receiptSts.vItemPrice}>
                        <Text style={receiptSts.txtItemPrice}>{parseInt(item.total_payment).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                    </View>
                </CollapseHeader>
                <CollapseBody >
                    {(item.detail != undefined) ? item.detail.map((detail, i) => {
                        return (
                            <View style={receiptSts.vReceiptDetail} key={i}>
                                <View style={receiptSts.vDetailContent}>
                                    <Image style={receiptSts.imgProduct} source={{ uri: API_ADMIN_URL + "/" + detail.product_id.p_image }} />
                                    <View style={receiptSts.vProDetail}>
                                        <Text style={receiptSts.txtProHeader}>{detail.product_id.product_name}</Text>
                                        <Text style={receiptSts.txtProDetail}>Cung cấp bởi: <Text style={receiptSts.txtMerchan}>Vinamilk</Text></Text>
                                        <Text style={receiptSts.txtProDetail}>SKU: {detail.product_id.product_id}</Text>
                                        <Text style={receiptSts.txtProDetail}><Text style={receiptSts.txtSmallPrice}>{parseInt(detail.product_id.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text> x {detail.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }) : null}
                </CollapseBody>
            </Collapse>
        )

    }

    _pullToRefresh() {
        this.setState({ page: 1, refreshing: true }, () => {
            this._loadReceipt(1);
        });
    }

    render() {
        var receipts = this.state.receipts;
        // console.log(receipts);
        return (
            <MainTheme style={receiptSts.container}>
                <Header navigation={this.props.navigation} isBack />

                <ScrollView style={receiptSts.container} contentContainerStyle={{
                    justifyContent: "space-between", flexGrow: 1
                }} alwaysBounceVertical={false}>
                    <View style={receiptSts.vHeader}>
                        <View style={receiptSts.vHeaderField}>
                            <Text style={receiptSts.txtHeader}>HÓA ĐƠN</Text>
                        </View>
                    </View>
                    <View style={receiptSts.vContent}>
                        <View style={receiptSts.vPersonal}>
                            <Text style={receiptSts.txtPersonal}>Danh sách hóa đơn</Text>
                        </View>
                        <FlatList
                            removeClippedSubviews={true}
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._pullToRefresh()}
                            data={receipts}
                            renderItem={({ item, index }) => { return this._renderItem(item, index) }}
                            onEndReached={() => {
                                if (receipts.length < this.state.totalPage) {
                                    this.setState({ loadMore: true }, () => {
                                        this.setState({ page: this.state.page + 1 }, () => {
                                            this._loadReceipt(this.state.page);
                                        });
                                    });
                                }
                            }}
                            onEndReachedThreshold={0.1}
                        />
                        {(this.state.loadMore) ? (
                            <ActivityIndicator style={receiptSts.vLoading} size="small" color={constSts.COLOR_MAIN} />
                        ) : null}
                    </View>
                </ScrollView>
            </MainTheme>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    province: state.global.province,
    error: state.error,
});

export default connect(mapStateToProps, null)(Receipt);