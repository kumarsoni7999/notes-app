import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const Card = (props: any) => {

    const { item } = props

    useEffect(() => {
    }, [])

    return (
        <View style={{
            backgroundColor: '#cde1ff',
            padding: 10,
            borderRadius: 5,
            marginBottom: 5
        }}>
            <Text style={{
                fontSize: 18,
                color: 'black'
            }} numberOfLines={2}>
                {item?.title  || 'Untitled'}
            </Text>
            <Text style={{
                fontSize: 14,
            }} numberOfLines={3}>
                {item?.description || 'no data'}
            </Text>
            <Text style={{
                fontSize: 12,
                paddingTop: 5,
                textAlign: 'right'
            }}>
                {item?.date || ''}
            </Text>
        </View>
    )
}

export default Card