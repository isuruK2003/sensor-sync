import { View, Text, StyleSheet, Pressable } from "react-native";

interface CardProps {
    title: string;
    content: string[];
    onPress?: () => void;
}

export function Card({ title, content, onPress }: CardProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed
        ]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.contentContainer}>
                {content.map((item, index) => (
                    <Text key={index} style={styles.contentText}>
                        {item}
                    </Text>
                ))}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 15,

        shadowColor: "#666",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,

        margin: 8,
        marginBottom: 4,

        borderRadius: 8,
    },
    pressed: {
        opacity: 0.7,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    contentContainer: {
        paddingLeft: 10,
    },
    contentText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    }
});
