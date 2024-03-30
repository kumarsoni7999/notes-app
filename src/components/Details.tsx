import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { notes } from '../assets/properties'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getNotesFromAsync } from '../screen/main/Index'

const Details = (props: any) => {

    const { item } = props

    const [title, setTitle] = useState(item?.title || '')
    const [desc, setDesc] = useState(item?.description || '')

    const saveToAsync = async () => {
        let obj = {
            id: item?.id,
            title: title,
            description: desc,
            date: item?.date
        }
        const data = await getNotesFromAsync()
        if (data && data.hasOwnProperty(obj.id)) {
            data[item?.id] = obj
            AsyncStorage.setItem('notes', JSON.stringify(data))
        }
        props.setTabs(0)
    }

    return (
        <View style={{
            backgroundColor: '#303134',
            flex: 1,
            padding: 10
        }}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity onPress={() => {
                    props.setTabs(0)
                }} style={{
                    paddingBottom: 20
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: 'white'
                    }}>
                        Back to notes
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveToAsync} style={{
                    paddingBottom: 20
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: 'white',
                    }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>

            <TextInput
                value={title}
                placeholder='Title'
                placeholderTextColor={'gray'}
                style={{
                    color: 'white',
                    fontSize: 20
                }}
                onChangeText={setTitle} />

            <Text style={{
                fontSize: 12,
                color: 'white'
            }}>
                {item?.date || ''}
            </Text>

            <ScrollView>
                <TextInput
                    value={desc}
                    placeholder='notes'
                    multiline
                    placeholderTextColor={'gray'}
                    style={{
                        color: 'white',
                        fontSize: 14
                    }}
                    onChangeText={setDesc} />
            </ScrollView>

        </View>
    )
}

export default Details