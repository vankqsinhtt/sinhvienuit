import React, { PropTypes } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, View, Toast } from 'native-base';
import { backAction, ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';
import ListItem from './Item';
import EmptyList from '../../../EmptyList';

class List extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(data) {
        super(data);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            Toast.show({
                text: nextProps.error,
                position: 'bottom',
                buttonText: 'Bỏ qua',
                type: 'warning',
                duration: 10000
            });
            this.props.setError(false);
        }
        else {
            if ((nextProps.refreshing === false) && (this.props.refreshing === true)) {
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
    render() {
        let courses = this.props.courses.sort(function(a, b) {
            let timeA = a.getCurrentTimeEnd();
            let timeB = b.getCurrentTimeEnd();
            let currentTime = new Date();
            if (timeA > currentTime) timeA -= 999999;
            if (timeB > currentTime) timeB -= 999999;
            if (timeA > timeB) return 1;
            else return -1;
        });
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={ () => this.props.navigation.dispatch(backAction) } transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Môn học</Title>
                    </Body>
                    <Right />
                </Header>
                <View padder style={{ flex: 1 }}>
                    <FlatList
                        ListEmptyComponent = { <EmptyList/> }
                        data={ courses }
                        horizontal={ false }
                        keyExtractor={ course => course.getCode() + course.getDayOfWeek() + course.getLessonStart()  }
                        renderItem={ ({item}) =>
                            <ListItem
                                course={ item }
                                navigation={ this.props.navigation }
                                numberNotifications={ this.props.numberOfCourseNotificationsList[item.getCode()] }
                                numberDeadlines={ this.props.numberOfDeadlinesList[item.getCode()] }
                            />
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={ this.props.refreshing }
                                onRefresh={ () => this.props.onRefresh() }
                                colors={ ANDROID_PULL_TO_REFRESH_COLOR }
                            />
                        }
                    />
                </View>
            </Container>
        )
    }
}
List.propsType = {
    courses: PropTypes.array.isRequired,
    listOfDeadLines: PropTypes.object,
    numberOfCourseNotificationsList: PropTypes.object,
    numberOfDeadlinesList: PropTypes.object,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;