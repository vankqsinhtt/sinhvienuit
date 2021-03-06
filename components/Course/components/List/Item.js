import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { CardItem, Right, Text, Card, Icon } from 'native-base';
import CountNotification from './CountNotification';

class Item extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={
                () => this.props.navigation.navigate('CourseDetails', { course: this.props.course })
            }>
                <Card>
                    <CardItem>
                        <Text>{ this.props.course.getName() }</Text>
                        <Right>
                            <Icon name="arrow-forward"/>
                        </Right>
                    </CardItem>
                    <CardItem style={{paddingTop: 2}}>
                        <Icon name="time"/>
                        <Text>
                            Giờ học: {
                            this.props.course.getLessonStart('LT')
                            + " - " + this.props.course.getLessonEnd('LT')
                            + ' ngày '
                            + this.props.course.getCurrentTimeEnd('DD/MM')
                        }
                        </Text>
                    </CardItem>
                    <CardItem style={{paddingTop: 2}}>
                        <Icon name="home"/>
                        <Text>Phòng học: { this.props.course.getRoom() }</Text>
                    </CardItem>
                    <CountNotification numberNotifications = { this.props.numberNotifications } numberDeadlines = { this.props.numberDeadlines }/>
                </Card>
            </TouchableOpacity>
        )
    }
}
Item.propTypes = {
    course: PropTypes.object.isRequired,
    numberNotifications: PropTypes.number,
    numberDeadlines: PropTypes.number
};
export default Item;