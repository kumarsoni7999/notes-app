import { View, Text, Touchable, TouchableOpacity, ToastAndroid, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Card = (props: any) => {

    const { item, refresh } = props

    const deleteNote = async () => {
        const note: any = await AsyncStorage.getItem('notes')
        let getNotes = JSON.parse(note)
        if (getNotes && getNotes.hasOwnProperty(item?.id)) {
            delete getNotes[item?.id]
            ToastAndroid.show('Note deleted', ToastAndroid.SHORT)
            AsyncStorage.setItem('notes', JSON.stringify(getNotes))
            props.setRefresh(!refresh)
        }
    }

    return (
        // <ImageBackground
        //     source={require('../assets/noteCard.jpg')}
        //     style={{
        //         flex: 1,
        //         borderRadius: 10
        //     }}
        //     resizeMode="cover">
            <View style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 10,
                marginBottom: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 'bold'
                    }} numberOfLines={2}>
                        {item?.title || 'Untitled'}
                    </Text>
                    <TouchableOpacity onPress={deleteNote}>
                        <Text style={{
                            fontSize: 16,
                            color: 'red'
                        }} numberOfLines={2}>
                            delete
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{
                    fontSize: 14,
                    color: 'black'
                }} numberOfLines={3}>
                    {item?.description || 'no data'}
                </Text>
            </View>
        // </ImageBackground>
    )
}

export default Card