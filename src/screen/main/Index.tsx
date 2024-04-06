import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Details from '../../components/Details'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getNotesFromAsync = async () => {
    let notes = null
    const data = await AsyncStorage.getItem('notes')
    if (data) {
        notes = JSON.parse(data)
    }
    return notes
}

export const saveToAsync = async (obj: any) => {
    const data = await getNotesFromAsync()
    if (!data) {
        let arr: any = {}
        arr[obj.id] = obj
        AsyncStorage.setItem('notes', JSON.stringify(arr))
    } else if (data && !data.hasOwnProperty(obj.id)) {
        let checkExist = Object.values(data).filter((item: any) => !item.title && !item.description)
        if (checkExist.length > 0) {
            return false
        }
        data[obj.id] = obj
        AsyncStorage.setItem('notes', JSON.stringify(data))
    }
}

const Index = (props: any) => {

    const [notes, setNotes] = useState(null)
    const [tabs, setTabs] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [selectedData, setSelectedData] = useState<any>({})

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={
            () => {
                setSelectedData(item)
                setTabs(1)
            }
        }>
            <Card item={item} setRefresh={setRefresh} refresh={refresh} />
        </TouchableOpacity>
    )

    function generateRandomId(length: any) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    useEffect(() => {
        const note = async () => {
            let data = await getNotesFromAsync()
            if (data) {
                setNotes(data)
            }
        }
        if (tabs == 0) {
            note()
        }
    }, [tabs, refresh])

    const handleClick = async () => {
        let obj = {
            id: generateRandomId(10).toLowerCase(),
            title: '',
            description: '',
            date: moment().format('DD MMM, YYYY hh:mm a')
        }
        setSelectedData(obj)
        const data = await getNotesFromAsync()
        if (!data) {
            let arr: any = {}
            arr[obj.id] = obj
            AsyncStorage.setItem('notes', JSON.stringify(arr))
        } else if (data && !data.hasOwnProperty(obj.id)) {
            let checkExist = Object.values(data).filter((item: any) => !item.title && !item.description)
            if (checkExist.length > 0) {
                setSelectedData(checkExist[0])
            } else {
                data[obj.id] = obj
                AsyncStorage.setItem('notes', JSON.stringify(data))
            }
        }
        setTabs(1)
    }

    return (
        <ImageBackground
            source={require('../../assets/bg.jpg')}
            style={{
                flex: 1
            }}
            resizeMode="cover">
            <View style={{
                flex: 1,
                padding: 10
            }}>
                {tabs == 0 && (
                    <View style={{
                        flex: 1
                    }}>
                        <View style={{
                            paddingBottom: 30
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 24
                            }}>
                                Hii Rahul Soni
                            </Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 14
                            }}>
                                here are your notes
                            </Text>
                        </View>
                        {notes && Object.values(notes).length > 0 ? <FlatList
                            data={Object.values(notes)}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: '100%'
                                }}>
                                    <Text style={{
                                        color: 'white'
                                    }}>
                                        No data
                                    </Text>
                                </View>
                            }
                        /> : (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: '100%'
                            }}>
                                <Text style={{
                                    color: 'white'
                                }}>
                                    No notes
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity style={{
                            backgroundColor: '#0099ff',
                            borderRadius: 100,
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 10,
                            right: 10
                        }} onPress={handleClick}>
                            <Text style={{
                                color: 'white',
                                fontSize: 30
                            }}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {tabs == 1 && <Details item={selectedData} setTabs={setTabs} />}
            </View>
        </ImageBackground>
    )
}

export default Index