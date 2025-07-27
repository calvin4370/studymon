import { View, Text, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import BackButton from '@/components/BackButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import SaveButton from '@/components/SaveButton';
import RowButton from '@/components/RowButton';
import icons from '@/constants/icons';
import utils from '@/constants/utils';
import colors from '@/constants/colors';
import RectangleButton from '@/components/RectangleButton';
import { doc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';

const AddEventScreen = () => {
  const router = useRouter();

  // Calculate Window Dimensions
  // const windowWidth = Dimensions.get('window').width;

  // Button Handle Logic
  const handleBackButtonPress = () => {
    router.push('../(tabs)/ScheduleScreen');
  };

  const handleSaveButtonPress = () => {
    Keyboard.dismiss(); // Close keyboard after saving
  };

  const handleAddEventButtonPress = () => {
    // const validDeadline =
    //   date.getTime() !== new Date(2025, 6, 28, 14, 0, 0, 0).getTime();
    if (
      title &&
      description &&
      startDate.getTime() < endDate.getTime()
    ) {
      // Add task to user document's events subcollection
      const userId = FIREBASE_AUTH.currentUser?.uid || '';
      const userDocRef = doc(FIREBASE_DATABASE, 'users', userId);

      router.push('../(tabs)/ScheduleScreen');
      try {
        utils.addEvent({
          userDocRef: userDocRef, // The reference to the user's document
          title: title.trim(),
          description: description.trim(),
          startDate: startDate,
          endDate: endDate,
          createdAt: new Date(Date.now()),
          travelTimeTo: parseInt(hoursTravelTimeTo, 10) * 60 + parseInt(minutesTravelTimeTo, 10),
          travelTimeBack: parseInt(hoursTravelTimeFrom, 10) * 60 + parseInt(minutesTravelTimeFrom, 10),
          source: 'manual',
        });
        alert('Event Added');
      } catch (error: any) {
        console.error('Failed to add task:', error);
        alert('Failed to add task: ' + error.message);
      }
    } else {
      alert('Missing/Invalid fields!');
    }
  };

  const handleStartDateButtonPress = () => {
    setShowStartDateTimePicker(true)
  }

  const handleEndDateButtonPress = () => {
    setShowEndDateTimePicker(true)
  }

  const onChangeStartDate = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowStartDateTimePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowEndDateTimePicker(false);
    setEndDate(currentDate);
  };

  // States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDateTimePicker, setShowStartDateTimePicker] = useState(false);
  const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(false);
  const [hoursTravelTimeTo, setHoursTravelTimeTo] = useState('0');
  const [minutesTravelTimeTo, setMinutesTravelTimeTo] = useState('0');
  const [hoursTravelTimeFrom, setHoursTravelTimeFrom] = useState('0');
  const [minutesTravelTimeFrom, setMinutesTravelTimeFrom] = useState('0');


  return (
    <View>
      <View className='flex-row p-[10px] pb-[20px] justify-between'>
        <BackButton onButtonPress={handleBackButtonPress} />
        <View className='mt-[10px] items-center'>
          <Text className='font-bold text-text text-[24px]'>Add Event</Text>
        </View>
        <SaveButton onButtonPress={handleSaveButtonPress}/>
      </View>

      {/* Main Add Task UI */}
      <View className='px-[20px] pb-[25px]'>
        

        {/* Title */}
        <View className='mb-[15px]'>
          <Text className='font-semibold text-text text-[20px] mb-[5px]'>
            Title
          </Text>
          <ThemedTextInput
            height={40}
            placeholder={'Enter Task Title'}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description */}
        <View className='mb-[15px]'>
          <Text className='font-semibold text-text text-[20px] mb-[5px]'>
            Description
          </Text>
          <ThemedTextInput
            height={70}
            placeholder={'Enter Task Description'}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            className='rounded-[10px]'
          />
        </View>

        {/* Start Date */}
        <View className='mb-[15px]'>
          <Text className='font-semibold text-text text-[20px] mb-[5px]'>
            Start Date
          </Text>
          <Text className='font-medium text-text text-[14px] mb-[5px]'>
            {startDate.toLocaleString()}
          </Text>
          <View className='flex-row gap-[10px]'>
            <RectangleButton
              onButtonPress={handleStartDateButtonPress}
              label='Set Start Date'
              icon={icons.calendar}
              height={30}
            />
          </View>

          {showStartDateTimePicker && (
            <DateTimePicker
              testID='dateTimePicker'
              value={startDate}
              mode='datetime'
              onChange={onChangeStartDate}
            />
          )}
        </View>

        {/* End Date */}
        <View className='mb-[15px]'>
          <Text className='font-semibold text-text text-[20px] mb-[5px]'>
            End Date
          </Text>
          <Text className='font-medium text-text text-[14px] mb-[5px]'>
            {endDate.toLocaleString()}
          </Text>
          <View className='flex-row gap-[10px]'>
            <RectangleButton
              onButtonPress={handleEndDateButtonPress}
              label='Set End Date'
              icon={icons.calendar}
              height={30}
            />
          </View>

          {showEndDateTimePicker && (
            <DateTimePicker
              testID='dateTimePicker'
              value={endDate}
              mode='datetime'
              onChange={onChangeEndDate}
            />
          )}
        </View>

        {/* Estimated Travel Time */}
        <View className='flex-row justify-between'>
          <View className='mb-[15px]'>
            <Text className='font-semibold text-text text-[20px] mb-[5px]'>
              Travel Time To
            </Text>
            <View className='flex-row gap-[10px]'>
              <View>
                <Text className='text-text font-medium text-[16px] pb-[5px]'>
                  Hours
                </Text>
                <ThemedTextInput
                  width={80}
                  height={35}
                  placeholder={'Hours'}
                  value={hoursTravelTimeTo}
                  onChangeText={setHoursTravelTimeTo}
                  multiline={true}
                  keyboardType='number-pad'
                  className='rounded-[10px]'
                  textClassName='text-[16px]'
                />
              </View>
              <View>
                <Text className='text-text font-medium text-[16px] pb-[5px]'>
                  Minutes
                </Text>
                <ThemedTextInput
                  width={80}
                  height={35}
                  placeholder={'Minutes'}
                  value={minutesTravelTimeTo}
                  onChangeText={setMinutesTravelTimeTo}
                  multiline={true}
                  keyboardType='number-pad'
                  className='rounded-[10px]'
                  textClassName='text-[16px]'
                />
              </View>
            </View>
          </View>

          <View className='mb-[15px]'>
            <Text className='font-semibold text-text text-[20px] mb-[5px]'>
              Travel Time From
            </Text>
            <View className='flex-row gap-[10px]'>
              <View>
                <Text className='text-text font-medium text-[16px] pb-[5px]'>
                  Hours
                </Text>
                <ThemedTextInput
                  width={80}
                  height={35}
                  placeholder={'Hours'}
                  value={hoursTravelTimeFrom}
                  onChangeText={setHoursTravelTimeFrom}
                  multiline={true}
                  keyboardType='number-pad'
                  className='rounded-[10px]'
                  textClassName='text-[16px]'
                />
              </View>
              <View>
                <Text className='text-text font-medium text-[16px] pb-[5px]'>
                  Minutes
                </Text>
                <ThemedTextInput
                  width={80}
                  height={35}
                  placeholder={'Minutes'}
                  value={minutesTravelTimeFrom}
                  onChangeText={setMinutesTravelTimeFrom}
                  multiline={true}
                  keyboardType='number-pad'
                  className='rounded-[10px]'
                  textClassName='text-[16px]'
                />
              </View>
            </View>
          </View>
        </View>

        {/* Confirmation Buttons */}
        <View>
          <RowButton
            icon={icons.check}
            label={'Add Event'}
            tintColor={colors.background}
            backgroundColour={'bg-accent'}
            className='mb-[10px]'
            onButtonPress={handleAddEventButtonPress}
          />
          <RowButton
            icon={icons.close}
            label={'Cancel'}
            tintColor={colors.background}
            backgroundColour={'bg-text-2'}
            onButtonPress={handleBackButtonPress}
          />
        </View>
      </View>
    </View>
  );
};

export default AddEventScreen;
