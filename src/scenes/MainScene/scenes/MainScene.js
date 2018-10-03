import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

import MainTheme from '../components/mainTheme';
import Header from '../components/header';
import mainStyle from './mainStyle';
import LoadingScreen from '../../../components/LoadingScreen/loadingScreen';
import {GetQrAction} from '../../../services/redux/actions/GetQr/GetQrAction';

const base64img = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATCSURBVO3BQY4jRxAEwfAC//9l1xzzVECjk6PVKszwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1LzBJBvUnMD5Ak1E5DfpOaNk6pFJ1WLTqoWfbJMzSYgb6h5AsgTQCY1k5obIE+o2QRk00nVopOqRSdViz75MiBPqHkCyKRmAjKpeULNBGRSMwGZ1ExANgF5Qs03nVQtOqladFK16JO/DJBJzQTkRs0E5Ak1E5BJzQTkb3JSteikatFJ1aJP/ufU3KiZgExAJjWTmv+Tk6pFJ1WLTqoWffJlav4mam6A3KjZpOZPclK16KRq0UnVok+WAfk3qZmATGomIJOaCcikZgIyqZmAbALyJzupWnRSteikatEnL6n5kwD5NwG5AfKEmv+Sk6pFJ1WLTqoW4Y+8AGRSMwHZpOYNIDdq3gAyqXkDyCY133RSteikatFJ1SL8kUVAnlAzAZnU3AB5Qs0NkCfUPAHkCTU3QN5Qs+mkatFJ1aKTqkWfvATkRs0NkEnNBOQJNTdAvgnIpOZGzRNAnlAzAfmmk6pFJ1WLTqoWffKSmgnIDZAn1ExAJjVPqLkBMqmZgDwBZFIzAZnUvKFmAnIDZFLzxknVopOqRSdVi/BHXgDyhpobIJOaGyCTmgnIjZoJyBNqJiCTmhsgN2pugExqftNJ1aKTqkUnVYs+eUnNBORGzRNqJiC/Sc0E5JvUPAFkUjMBmdR800nVopOqRSdViz55Ccik5gkgb6h5Q80baiYgk5oJyKTmDTUTkH/TSdWik6pFJ1WLPvllQG7U3AB5AsgNkEnNBGRSMwGZ1NyomYBMaiYgb6i5ATKpeeOkatFJ1aKTqkX4I4uATGomIDdqJiC/Sc0NkEnNbwIyqXkCyKRm00nVopOqRSdVi/BHXgDyhJoJyKTmBsgbaiYgm9TcALlRcwPkRs0TQCY1b5xULTqpWnRSteiTZWomIBOQJ4BMap4AsknNDZBJzY2aJ9TcAJnUTEC+6aRq0UnVopOqRZ/8MjUTkAnIpOYJIE+omYBMam6APKFmAjKpuQFyo2YC8ptOqhadVC06qVr0yZepmYA8AWRS8waQGzUTkBs1N0AmNTdA3gByo2YCsumkatFJ1aKTqkX4I/9hQJ5QMwGZ1DwBZFJzA+RGzRNAbtT8ppOqRSdVi06qFn3yEpDfpGZSMwGZ1ExAJjVvqJmATGreADKpuVEzAZnUTEAmNW+cVC06qVp0UrXok2VqNgG5ATKpmYDcAJnUTEAmNROQSc0mNU8AmdT8ppOqRSdVi06qFn3yZUCeUPMnUTMB+SYgb6i5ATKp2XRSteikatFJ1aJP/nJqngDyhJobIJOaCcik5g0gk5rfdFK16KRq0UnVok/+ckDeUDMBuQEyqZmATGomIE+ouQHym06qFp1ULTqpWvTJl6n5JjU3aiYgk5on1ExAJjVPAJnUPAFkUjMBuQEyqXnjpGrRSdWik6pFnywD8puATGomIDdA3lAzAXlCzQ2Qb1Kz6aRq0UnVopOqRfgjVUtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqladFK16KRq0UnVopOqRf8A6QslRKiymSUAAAAASUVORK5CYII=`;

class MainScene extends Component{
    static navigationOptions = {
        title: 'Main',
        header:null,
        headerLeft: null,gesturesEnabled: false,
      };
    constructor(props){
        super(props);
    }

    render(){
        const height = (this.props.loadingScreen==true) ? "100%" : 0;
        return (
            <MainTheme style={mainStyle.container}>
                <Header navigation={this.props.navigation} />
                <ScrollView contentContainerStyle={mainStyle.body}>
                        <View style={mainStyle.bodyText}>
                            <Text style={mainStyle.text}>Xin Chào, {this.props.user.name}</Text>
                        </View>
                        <View style={mainStyle.imgBody}>
                            <Image style={mainStyle.img} source={{uri: this.props.qrcode}}/>
                        </View>
                </ScrollView>
                <View style={mainStyle.footer}>
                    <TouchableOpacity style={mainStyle.btnFooter}>
                        <Text style={mainStyle.footerText}>Xem vị trí cửa hàng</Text>
                    </TouchableOpacity>
                </View>
                <LoadingScreen style={{height}} animating={this.props.loadingScreen}/> 
            </MainTheme>
        );
    }

    async _getQrCode(){
        console.log("qr");
        this.props.GetQrAction(this.props.user.jwt_string);
    }

    componentDidMount(){
        setInterval(async ()=> await this._getQrCode(), 1000 * 60 * 3);
    }
}

function mapStateToProps(state){
    return {
        user:state.user,
        loadingScreen : state.loadingScreen,
        qrcode:state.qrcode
    };
}

export default connect(mapStateToProps,{
    GetQrAction
})(MainScene);