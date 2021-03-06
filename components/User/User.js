import React, { PropTypes } from "react";
import { Alert, Image } from 'react-native';
import { Header, Title, Body, View, Text, Button, Container, Icon, Toast, Content, ListItem, Left, Right, Card, CardItem } from "native-base";
import { backAction } from '../../config/config';
import Spinner from 'react-native-loading-spinner-overlay';
import bgImage from '../../assets/background-profile.jpg';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.updateInformation = this.updateInformation.bind(this);
    }
    static navigationOptions = {
        header: null
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.getError()) {
            Toast.show({
                text: nextProps.user.getError(),
                position: 'bottom',
                buttonText: 'Bỏ qua',
                type: 'warning',
                duration: 10000
            });
            this.props.setUserError(false);
        }
        else {
            if ((nextProps.user.getLoading() === false) && (this.props.user.getLoading() === true)) {
                Toast.show({
                    text: 'Cập nhật thông tin thành công',
                    position: 'bottom',
                    buttonText: 'Bỏ qua',
                    type: 'success',
                    duration: 10000
                });
            }
        }
    }
    logout() {
        Alert.alert(
            'Xác nhận',
            'Bạn có thật sự muốn đăng xuất?',
            [
                {
                    text: 'OK',
                    onPress: () => this.props.logout()
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
            ],
            { cancelable: true }
        )
    }
    updateInformation() {
        this.props.getUser();
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={ () => this.props.navigation.dispatch(backAction) } transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tài khoản</Title>
                    </Body>
                    <Right />
                </Header>
                <Spinner
                    visible={ this.props.user.getLoading() }
                    textContent={"Loading..."}
                    textStyle={{color: '#FFF'}}
                />
                <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} source={ bgImage }>
                    <Content style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} padder>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                             {
                                 (this.props.user.getPicture()) ?
                                     <Image style={ styles.Logo } source={{ uri : this.props.user.getPicture() }}/>
                                     :
                                     <Image style={ styles.Logo } source={ require('../../assets/noavatar.jpg') }/>
                             }
                        </View>
                        <Card>
                            <CardItem>
                                <Text>Họ tên: { this.props.user.getName() }</Text>
                            </CardItem>
                            <CardItem>
                                <Text>Ngày sinh: { this.props.user.getBirthDay() }</Text>
                            </CardItem>
                            <CardItem>
                                <Text>Khoa: { this.props.user.getFaculty() }</Text>
                            </CardItem>
                            <CardItem>
                                <Text>Hệ đào tạo: { this.props.user.getTrainType() }</Text>
                            </CardItem>
                        </Card>
                        <Card>
                            <ListItem button onPress={ () => this.updateInformation() } icon>
                                <Left>
                                    <Button onPress={ () => this.updateInformation() } info>
                                        <Icon active name="refresh"/>
                                    </Button>
                                </Left>
                                <Body>
                                <Text>Cập nhật thông tin</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                            <ListItem button onPress={ () => this.logout() } last icon>
                                <Left>
                                    <Button onPress={ () => this.logout() } danger>
                                        <Icon active name="log-out"/>
                                    </Button>
                                </Left>
                                <Body>
                                <Text>Đăng xuất</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        </Card>
                </Content>
                </Image>
            </Container>
        )
    }
}
const styles = {
    LogoView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    Logo: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 6
    },
    container: {
        flex: 1,
        margin: 15
    }
};
User.propTypes = {
  user: PropTypes.object.isRequired
};
export default User;