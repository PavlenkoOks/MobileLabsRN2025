import { StyleSheet } from "react-native"

const colors = {
  primary: "#6B8E23",
  secondary: "#FF8C00",
  success: "#3CB371",
  background: "#F5F5DC",
  white: "#FFFFFF",
  text: {
    primary: "#4A4A4A",
    secondary: "#7C7C7C",
    light: "#A0A0A0",
    white: "#FFFFFF"
  },
  border: "#D3D3C6",
  shadow: {
    color: "#000",
    offset: { width: 0, height: 3 },
    opacity: 0.12,
    radius: 6
  }
}

const spacing = {
  xs: 6,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
  xxl: 35
}

const typography = {
  title: {
    fontSize: 26,
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 18,
    color: colors.text.secondary
  },
  body: {
    fontSize: 17,
    lineHeight: 26
  },
  caption: {
    fontSize: 13,
    color: colors.text.light
  }
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.xl,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 3
  },

  title: {
    ...typography.title,
    marginTop: spacing.xl,
    marginBottom: spacing.sm
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: "center",
    marginBottom: spacing.xxl
  },
  body: typography.body,
  caption: typography.caption,

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 10,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 3
  },
  buttonText: {
    color: colors.text.white,
    fontSize: 17,
    fontWeight: "600",
    marginLeft: spacing.sm
  },

  pathContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 3
  },
  upButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
    padding: spacing.sm
  },
  upButtonText: {
    marginLeft: spacing.xs,
    color: colors.primary,
    fontWeight: "600"
  },
  pathText: {
    flex: 1,
    fontSize: 15,
    color: colors.text.secondary
  },
  list: {
    padding: spacing.md
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.sm,
    padding: spacing.md,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 3
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: colors.text.primary
  },
  itemInfo: {
    fontSize: 15,
    color: colors.text.secondary
  },
  moreButton: {
    padding: spacing.sm
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl
  },
  emptyText: {
    marginTop: spacing.md,
    color: colors.text.secondary,
    fontSize: 17
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: 10,
    marginHorizontal: spacing.xs
  },
  folderButton: {
    backgroundColor: colors.secondary
  },
  fileButton: {
    backgroundColor: colors.primary
  },
  actionButtonText: {
    color: colors.text.white,
    fontWeight: "600",
    marginLeft: spacing.sm,
    fontSize: 17
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.xl,
    width: "90%",
    maxWidth: 450
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: spacing.xl,
    textAlign: "center",
    color: colors.text.primary
  },
  inputLabel: {
    marginBottom: spacing.sm,
    fontSize: 17,
    color: colors.text.primary
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.xl,
    fontSize: 17,
    color: colors.text.primary
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: spacing.sm
  },
  modalButtonText: {
    color: colors.text.white,
    fontSize: 17,
    fontWeight: "600"
  },
  modalCancelButton: {
    padding: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border
  },
  modalCancelText: {
    color: colors.text.secondary,
    fontSize: 17
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  fileName: {
    fontSize: 19,
    fontWeight: "600",
    color: colors.text.primary
  },
  contentContainer: {
    flex: 1,
    padding: spacing.lg
  },
  loadingText: {
    textAlign: "center",
    color: colors.text.light,
    marginTop: spacing.xl,
    fontSize: 16
  },

  infoContainer: {
    marginTop: spacing.xxl,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.xl,
    shadowColor: colors.shadow.color,
    shadowOffset: colors.shadow.offset,
    shadowOpacity: colors.shadow.opacity,
    shadowRadius: colors.shadow.radius,
    elevation: 3
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  progressBarContainer: {
    height: 22,
    backgroundColor: colors.border,
    borderRadius: 11,
    marginTop: spacing.xl,
    overflow: "hidden"
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary
  },
  lastUpdated: {
    marginTop: spacing.lg,
    fontSize: 13,
    opacity: 0.6,
    textAlign: "center",
    color: colors.text.secondary
  }
})

export default styles