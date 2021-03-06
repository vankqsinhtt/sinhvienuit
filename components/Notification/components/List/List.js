import React, { PropTypes } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { View } from 'native-base';
import Notification from './Item';
import EmptyList from '../../../EmptyList';
import { ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if ((typeof this.props.onRefresh !== 'undefined') && (typeof this.props.refreshing !== 'undefined')) {
            return (
                <FlatList
                    ListEmptyComponent = { <EmptyList/> }
                    data={ this.props.notifications }
                    keyExtractor={ item => item.getLink() }
                    renderItem={ ({item}) => <Notification notification={ item }/> }
                    refreshControl={
                        <RefreshControl
                            refreshing={ this.props.refreshing }
                            onRefresh={ () => this.props.onRefresh() }
                            colors={ ANDROID_PULL_TO_REFRESH_COLOR }
                        />
                    }
                />
            )
        }
        else {
            return (
                <View>
                    {
                        this.props.notifications.map(function (item) {
                            return <Notification notification={ item } key={ item.getLink() }/>
                        })
                    }
                </View>
            )
        }
    }
}
List.propsType = {
    notifications: PropTypes.array.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;