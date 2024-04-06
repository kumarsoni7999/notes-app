import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { notes } from '../assets/properties'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getNotesFromAsync } from '../screen/main/Index'
import Calculator from './Calculator'
import Modal from "react-native-modal";

const Details = (props: any) => {

    const { item } = props

    const [title, setTitle] = useState(item?.title || '')
    const [desc, setDesc] = useState(item?.description || '')

    const [showCalculator, setShowCalculator] = useState(false)

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

    const openCalculator = () => setShowCalculator(true)
    const closeCalculator = () => setShowCalculator(false)

    return (
        <ImageBackground
            source={require('../assets/bg.jpg')}
            style={{
                flex: 1,
            }}
            resizeMode="cover">
            <View style={{
                flex: 1
            }}>

                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity onPress={() => {
                        props.setTabs(0)
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: 'white'
                        }}>
                            Back to notes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={saveToAsync}>
                        <Text style={{
                            fontSize: 14,
                            color: 'white',
                        }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10
                }} onPress={openCalculator}>
                    <Text style={{
                        color: 'black'
                    }}>
                        Use Calculator
                    </Text>
                </TouchableOpacity> */}

                <TextInput
                    value={title}
                    placeholder='Title'
                    multiline
                    placeholderTextColor={'gray'}
                    style={{
                        color: 'white',
                        fontSize: 24
                    }}
                    onChangeText={setTitle} />

                <ScrollView>
                    <TextInput
                        value={desc}
                        placeholder='notes'
                        multiline
                        placeholderTextColor={'gray'}
                        style={{
                            color: 'white',
                            fontSize: 16
                        }}
                        onChangeText={setDesc} />
                </ScrollView>
            </View>
            <Modal
                isVisible={showCalculator}
                onBackdropPress={closeCalculator}
                onSwipeComplete={closeCalculator}
                style={{
                    flex: 1
                }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Calculator />
                </View>
            </Modal>
        </ImageBackground>
    )
}

export default Details