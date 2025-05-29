import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ClickableObject from '../components/ClickableObject';
import styles from '../../assets/styles/styles';

const GestureButtons = ({ gestureMode, setGestureMode }) => {
  const buttons = [
    { mode: 'tap', label: 'Tap' },
    { mode: 'longPress', label: 'Hold' },
  ];

  return (
    <View style={styles.gestureButtonsContainer}>
      {buttons.map(btn => (
        <TouchableOpacity
          key={btn.mode}
          onPress={() => setGestureMode(btn.mode)}
          style={[
            styles.gestureButton,
            gestureMode === btn.mode && styles.activeGestureButton,
          ]}
        >
          <Text style={styles.gestureButtonText}>{btn.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const GestureHandlerSwitcher = ({
  gestureMode,
  animatedStyle,
  refs,
  handlers,
}) => {
  const { singleTapRef, doubleTapRef, longPressRef } = refs;
  const { onSingleTap, onDoubleTap, onLongPress } = handlers;

  const imageUrl = "https://media.sketchfab.com/models/efc313bb4fc7434aa61b5b729e774189/thumbnails/5d3feff71f604f80ab4aaa7e6c840882/d56f0d5668e44237b82da7c62a3db624.jpeg";

  const renderClickableObject = (text) => (
    <Animated.View style={animatedStyle}>
      <ClickableObject imageUrl={imageUrl} text={text} />
    </Animated.View>
  );

  switch (gestureMode) {
    case 'tap':
      return (
        <TapGestureHandler
          ref={singleTapRef}
          waitFor={doubleTapRef}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) onSingleTap();
          }}
        >
          <Animated.View>
            <TapGestureHandler
              ref={doubleTapRef}
              numberOfTaps={2}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) onDoubleTap();
              }}
            >
              {renderClickableObject("Tap me!")}
            </TapGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      );
    case 'longPress':
      return (
        <LongPressGestureHandler
          ref={longPressRef}
          minDurationMs={3000}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) onLongPress();
          }}
        >
          {renderClickableObject("Hold me for 3s!")}
        </LongPressGestureHandler>
      );
    default:
      return (
        <TapGestureHandler
          ref={singleTapRef}
          waitFor={doubleTapRef}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) onSingleTap();
          }}
        >
          <Animated.View>
            <TapGestureHandler
              ref={doubleTapRef}
              numberOfTaps={2}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) onDoubleTap();
              }}
            >
              {renderClickableObject("Select 'Tap' or 'Hold'!")}
            </TapGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      );
  }
};

const HomeScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [lastGesture, setLastGesture] = useState('None');
  const [gestureMode, setGestureMode] = useState('tap');
  const [clicks, setClicks] = useState(0);
  const [doubleTaps, setDoubleTaps] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const doubleTapRef = useRef(null);
  const singleTapRef = useRef(null);
  const longPressRef = useRef(null);

  const handleSingleTap = useCallback(() => {
    setScore(prevScore => prevScore + 1);
    setClicks(prevClicks => prevClicks + 1);
    setLastGesture('Single Tap (+1)');
  }, []);

  const handleDoubleTap = useCallback(() => {
    setScore(prevScore => prevScore + 2);
    setDoubleTaps(prevDoubleTaps => prevDoubleTaps + 1);
    setLastGesture('Double Tap (+2)');
  }, []);

  const handleLongPress = useCallback(() => {
    setScore(prevScore => prevScore + 5);
    setLongPressCount(prevLongPress => prevLongPress + 1);
    setLastGesture('Long Press (+5)');
  }, []);


  const animatedClickableStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }, 
      { scale: scale.value },           
    ],
  }));

  const navigateToTasks = useCallback(() => {
    navigation.navigate('Tasks', {
      score,
      clicks,
      doubleTaps,
      longPress: longPressCount,
      panned: false,
      flingRight: false,
      flingLeft: false,
      pinched: false,
    });
  }, [
    navigation,
    score,
    clicks,
    doubleTaps,
    longPressCount,
  ]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.lastGestureText}>Last Gesture: {lastGesture}</Text>

      <GestureHandlerSwitcher
        gestureMode={gestureMode}
        animatedStyle={animatedClickableStyle}
        refs={{
          singleTapRef,
          doubleTapRef,
          longPressRef,
        }}
        handlers={{
          onSingleTap: handleSingleTap,
          onDoubleTap: handleDoubleTap,
          onLongPress: handleLongPress,
        }}
      />

      <GestureButtons gestureMode={gestureMode} setGestureMode={setGestureMode} />

      <TouchableOpacity style={styles.tasksButton} onPress={navigateToTasks}>
        <Text style={styles.tasksButtonText}>View Tasks</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;