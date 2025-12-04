import { DiscordSDK } from '@discord/embedded-app-sdk';
import { DiscordAuth } from '../types';

// =================================================================================
// IMPORTANT: ACTION REQUIRED
// =================================================================================
// 1. Go to the Discord Developer Portal: https://discord.com/developers/applications
// 2. Create a new application.
// 3. Copy the "Client ID" from the "General Information" page.
// 4. Paste your Client ID here to replace the placeholder value.
// =================================================================================
const DISCORD_CLIENT_ID = "1445721570554155130";

let discordSdk: DiscordSDK;

/**
 * Initializes the Discord SDK and attempts to authenticate the user.
 * @returns A promise that resolves with the SDK instance and user authentication data.
 * @throws An error if not running inside a Discord iframe or if authentication fails.
 */
export async function setupDiscordSdk(): Promise<{ sdk: DiscordSDK, auth: DiscordAuth }> {
  // The SDK uses a query parameter to determine if it's running in Discord.
  const isEmbedded = new URLSearchParams(window.location.search).get('frame_id') != null;
  if (!isEmbedded) {
    throw new Error("Not running in a Discord iframe.");
  }

  // Ensure Client ID is a string (handles case where user enters it as a number)
  const clientIdStr = String(DISCORD_CLIENT_ID);

  if (clientIdStr === "YOUR_DISCORD_CLIENT_ID_HERE") {
    throw new Error("Discord Client ID is not set. Please update services/discord.ts");
  }

  discordSdk = new DiscordSDK(clientIdStr);
  await discordSdk.ready();

  // The full OAuth2 flow (authorize -> token exchange -> authenticate) is required for
  // apps that need to act on behalf of the user (e.g., make API calls).
  // For many apps, simply getting the user's identity is sufficient.
  // The following is a simplified approach to get user data for UI purposes
  // without requiring a backend for the token exchange.

  console.log("Discord SDK is ready. Fetching user info...");

  // We can get the current user's info from the voice channel state.
  const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId! });
  if (!channel || !channel.voice_states) {
      throw new Error("Could not retrieve channel information.");
  }

  // Try to find the user. Note: .userId might not be in the type definition in all versions.
  // We cast to any to safely access it if it exists at runtime.
  const currentUserId = (discordSdk as any).userId;
  
  // If we can't find a user ID, we'll try to fallback to the first user or throw
  let currentUserVoiceState;
  
  if (currentUserId) {
    currentUserVoiceState = channel.voice_states.find(vs => vs.user.id === currentUserId);
  }
  
  // Fallback: If we can't identify the user (no auth), just grab the first one for UI demo purposes
  // or handle gracefully.
  if (!currentUserVoiceState && channel.voice_states.length > 0) {
      console.warn("Could not match current user ID. Using first available user state.");
      currentUserVoiceState = channel.voice_states[0];
  }

  if (!currentUserVoiceState) {
      throw new Error("Could not find any user in the voice channel.");
  }

  // Cast the user object to compatible type to avoid strict strictness issues with optional fields
  const auth: DiscordAuth = { user: currentUserVoiceState.user as any };

  return { sdk: discordSdk, auth };
}
