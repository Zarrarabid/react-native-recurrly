import { Link } from "expo-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';


const SignIn = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Add sign in logic here
    console.log('Signing in with:', email, password);
  };

  return (
    <View className="flex-1 bg-light-bg dark:bg-dark-bg justify-center">
      {/* Decorative Gradient/Glass Blobs in Background */}
      <View className="absolute top-20 -left-10 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
      <View className="absolute bottom-20 -right-10 w-56 h-56 bg-primary/20 rounded-full blur-3xl" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Glassmorphic Card Container */}
          <View className="rounded-3xl border p-4 border-light-glass-border dark:border-dark-glass-border overflow-hidden shadow-2xl">


            <Link href='./(tabs)/settings' className="text-white">
              Move
            </Link>

              {/* Header */}
              <View className="mb-8">
                <Text className="text-3xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
                  Welcome Back
                </Text>
                <Text className="text-base text-light-subtext dark:text-dark-subtext mt-1">
                  Sign in to continue to your account
                </Text>
              </View>

              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Email Address
                </Text>
                <View className="flex-row items-center bg-white/40 dark:bg-black/20 border border-light-glass-border dark:border-dark-glass-border rounded-2xl px-4 py-3">
                  <Mail size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="name@example.com"
                    placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 ml-3 text-light-text dark:text-dark-text text-base"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-2">
                <Text className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Password
                </Text>
                <View className="flex-row items-center bg-white/40 dark:bg-black/20 border border-light-glass-border dark:border-dark-glass-border rounded-2xl px-4 py-3">
                  <Lock size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                    secureTextEntry={!showPassword}
                    className="flex-1 ml-3 text-light-text dark:text-dark-text text-base"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                    ) : (
                      <Eye size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="align-self-end mb-6 self-end">
                <Text className="text-sm font-medium text-primary">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity
                onPress={handleSignIn}
                activeOpacity={0.8}
                className="bg-primary rounded-2xl py-4 flex-row justify-center items-center shadow-lg shadow-primary/30"
              >
                <Text className="text-white font-bold text-lg mr-2">Sign In</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Footer / Go to Sign Up */}
              <View className="flex-row justify-center items-center mt-6">
                <Text className="text-sm text-light-subtext dark:text-dark-subtext">
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation?.navigate('SignUp')}>
                  <Text className="text-sm font-bold text-primary">Sign Up</Text>
                </TouchableOpacity>
              </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignIn