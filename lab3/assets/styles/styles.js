import { StyleSheet } from 'react-native';

const colors = {
  background: '#F0F4F8', 
  primary: '#5C6BC0',  
  accent: '#FF7043',    
  success: '#66BB6A',   
  danger: '#EF5350',  
  textPrimary: '#263238', 
  textSecondary: '#607D8B', 
  white: '#FFFFFF',
  cardBackground: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
};

const borderRadius = {
  small: 8,
  medium: 12,
  large: 20,
  circle: 100,
};

const shadowProps = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 6,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: spacing.xxlarge,
    paddingHorizontal: spacing.medium,
  },
  scoreText: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: spacing.medium,
    marginBottom: spacing.small,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  lastGestureText: {
    fontSize: 20,
    color: colors.textSecondary,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  gestureButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.large,
    marginBottom: spacing.medium,
    gap: spacing.small,
  },
  gestureButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.small + 2,
    paddingHorizontal: spacing.large,
    margin: spacing.small - 3,
    borderRadius: borderRadius.small,
    minWidth: 100,
    alignItems: 'center',
    ...shadowProps,
    shadowColor: colors.primary,
  },
  activeGestureButton: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
    elevation: 8,
  },
  gestureButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 0.8,
  },
  tasksButton: {
    marginTop: spacing.xxlarge,
    paddingVertical: spacing.medium + 2,
    paddingHorizontal: spacing.xxlarge,
    backgroundColor: colors.danger,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    ...shadowProps,
    shadowColor: colors.danger,
  },
  tasksButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  clickableObject: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.circle,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textPrimary,
    ...shadowProps,
    shadowColor: colors.textPrimary,
    marginVertical: spacing.large,
    borderWidth: 4,
    borderColor: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.circle,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: spacing.medium,
  },
  clickText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1.2,
  },
  listContainer: {
    padding: spacing.medium,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  taskStatus: {
    width: 18,
    height: 18,
    borderRadius: borderRadius.small,
    marginRight: spacing.medium,
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },
  taskTitle: {
    fontSize: 18,
    color: colors.textPrimary,
  },
});

export default styles;