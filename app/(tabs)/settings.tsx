import images from "@/constants/images";
import { useClerk, useUser } from "@clerk/expo";
import { router } from "expo-router";
import { styled } from "nativewind";
import { usePostHog } from "posthog-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const posthog = usePostHog();

    const handleSignOut = async () => {
        try {
            // Track sign-out before ending the session
            posthog.capture("user_signed_out");

            // Sign out from Clerk
            await signOut();

            // Reset PostHog user/session
            posthog.reset();

            // Redirect to sign-in screen
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    };

    const displayName =
        user?.firstName ||
        user?.fullName ||
        user?.emailAddresses?.[0]?.emailAddress ||
        "User";

    const email = user?.emailAddresses?.[0]?.emailAddress;

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            {/* Header */}
            <Text className="text-3xl font-sans-bold text-primary mb-6">
                Settings
            </Text>

            {/* User Profile Section */}
            <View className="auth-card mb-5">
                <View className="flex-row items-center gap-4 mb-4">
                    <Image
                        source={
                            user?.imageUrl
                                ? { uri: user.imageUrl }
                                : images.avatar
                        }
                        className="size-16 rounded-full"
                    />

                    <View className="flex-1">
                        <Text className="text-lg font-sans-bold text-primary">
                            {displayName}
                        </Text>

                        {email && (
                            <Text className="text-sm font-sans-medium text-muted-foreground">
                                {email}
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            {/* Account Section */}
            <View className="auth-card mb-5">
                <Text className="text-base font-sans-semibold text-primary mb-3">
                    Account
                </Text>

                <View className="gap-2">
                    {/* Account ID */}
                    <View className="flex-row justify-between items-center py-2">
                        <Text className="text-sm font-sans-medium text-muted-foreground">
                            Account ID
                        </Text>

                        <Text
                            className="text-sm font-sans-medium text-primary flex-1 text-right ml-4"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {user?.id
                                ? `${user.id.substring(0, 20)}...`
                                : "N/A"}
                        </Text>
                    </View>

                    {/* Joined Date */}
                    <View className="flex-row justify-between items-center py-2">
                        <Text className="text-sm font-sans-medium text-muted-foreground">
                            Joined
                        </Text>

                        <Text className="text-sm font-sans-medium text-primary">
                            {user?.createdAt
                                ? new Date(
                                      user.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Sign Out Button */}
            <Pressable
                className="auth-button bg-destructive"
                onPress={handleSignOut}
            >
                <Text className="auth-button-text text-white">
                    Sign Out
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default Settings;