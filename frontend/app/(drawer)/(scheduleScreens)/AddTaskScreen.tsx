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
import DropDownPicker from 'react-native-dropdown-picker';
import RectangleButton from '@/components/RectangleButton';
import { doc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/firebaseConfig';

const AddTaskScreen = () => {
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

  const handleAddTaskButtonPress = () => {
    // const validDeadline =
    //   date.getTime() !== new Date(2025, 6, 28, 14, 0, 0, 0).getTime();
    if (
      title &&
      description &&
      (hours !== '0' || minutes !== '0') &&
      importance
    ) {
      // Add task to user document's tasks collection
      const userId = FIREBASE_AUTH.currentUser?.uid || '';
      const userDocRef = doc(FIREBASE_DATABASE, 'users', userId);

      router.push('../(tabs)/ScheduleScreen');
      try {
        utils.addTask({
          userDocRef: userDocRef, // The reference to the user's document
          title: title.trim(),
          description: description.trim(),
          deadline:
            date.getTime() !== new Date(2025, 6, 28, 14, 0, 0, 0).getTime()
              ? date
              : null,
          importance: importance as 'low' | 'medium' | 'high',
          estimatedDurationMinutes:
            parseInt(hours, 10) * 60 + parseInt(minutes, 10),
          completed: false,
        });
        alert('Task Added');
      } catch (error: any) {
        console.error('Failed to add task:', error);
        alert('Failed to add task: ' + error.message);
      }
    } else {
      alert('Missing/Invalid fields!');
    }
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: any) => {
    const currentDate = selectedDate;
    setShowDateTimePicker(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShowDateTimePicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [date, setDate] = useState(new Date(2025, 6, 28, 14, 0, 0, 0));
  const [mode, setMode] = useState('date');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [importance, setImportance] = useState<'low' | 'medium' | 'high' | null>(null);
  const [importanceDropdownOpen, setImportanceDropdownOpen] = useState(false);

  const importanceValues = ['low', 'medium', 'high'];

  return (
    <View>
      <View className='p-[10px] pb-[20px]'>
        <BackButton onButtonPress={handleBackButtonPress} />
      </View>

      {/* Main Add Task UI */}
      <View className='px-[20px] pb-[25px]'>
        <View className='mb-[10px] items-center'>
          <Text className='font-bold text-text text-[24px]'>Add Task</Text>
        </View>

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

        {/* Estimated Duration */}
        <View className='mb-[15px]'>
          <Text className='font-semibold text-text text-[20px] mb-[5px]'>
            Estimated Duration
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
                value={hours}
                onChangeText={setHours}
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
                value={minutes}
                onChangeText={setMinutes}
                keyboardType='number-pad'
                className='rounded-[10px]'
                textClassName='text-[16px]'
              />
            </View>
            <View className='justify-end'>
              <SaveButton onButtonPress={handleSaveButtonPress} />
            </View>
          </View>
        </View>

        {/* Deadline */}
        <View className='mb-[15px]'>
          <Text className='font-semibold text-text text-[20px] mb-[5px]'>
            Deadline
          </Text>
          <Text className='font-medium text-text text-[16px] mb-[5px]'>
            Selected:{' '}
            {date.getTime() !== new Date(2025, 6, 28, 14, 0, 0, 0).getTime()
              ? date.toLocaleString()
              : 'None'}
          </Text>
          <View className='flex-row gap-[10px]'>
            <RectangleButton
              onButtonPress={showDatepicker}
              label='Set Date'
              icon={icons.calendar}
              height={30}
            />
            <RectangleButton
              onButtonPress={showTimepicker}
              label='Set Time'
              icon={icons.clock}
              height={30}
            />
          </View>

          {showDateTimePicker && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>

        {/* Importance Dropdown */}
        <View className='mb-[20px]'>
          <Text className='font-semibold text-text text-[20px] mb-[5px]'>
            Importance
          </Text>
          <DropDownPicker
            open={importanceDropdownOpen}
            value={importance}
            items={importanceValues.map((val) => ({ label: val.charAt(0).toUpperCase() + val.slice(1), value: val }))}
            setOpen={setImportanceDropdownOpen}
            setValue={setImportance}
            containerStyle={{ height: 40 }}
            style={{
              borderRadius: 12,
              borderColor: '#e5e7eb',
              backgroundColor: '#fff',
              minHeight: 40,
            }}
            dropDownContainerStyle={{
              borderRadius: 12,
              borderColor: '#e5e7eb',
            }}
            textStyle={{
              fontSize: 16,
              color: '#22223b',
            }}
            placeholder='Select Task Importance'
          />
        </View>

        {/* Confirmation Buttons */}
        <View>
          <RowButton
            icon={icons.check}
            label={'Add Task'}
            tintColor={colors.background}
            backgroundColour={'bg-accent'}
            className='mb-[10px]'
            onButtonPress={handleAddTaskButtonPress}
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

export default AddTaskScreen;
