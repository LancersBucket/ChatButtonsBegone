/**
 * @name ChatButtonsBegone
 * @author LancersBucket
 * @description Remove annoying stuff from your Discord clients.
 * @version 3.2.2
 * @authorId 355477882082033664
 * @website https://github.com/LancersBucket/ChatButtonsBegone
 * @source https://raw.githubusercontent.com/LancersBucket/ChatButtonsBegone/refs/heads/main/ChatButtonsBegone.plugin.js
 */
class Styler {
    constructor(pluginName, api) {
		this.pluginName = pluginName;
        this.api = api;
        this.styles = [];
	}

	add(selector) {
        this.styles.push(selector);
	}

    apply() {
        this.api.DOM.addStyle(this.pluginName, `${this.styles.join(', ')} { display: none !important; }`);
    }

	purge() {
        this.api.DOM.removeStyle(this.pluginName);
        this.styles = [];
	}
}

const config = {
    info: {
        github: 'https://github.com/LancersBucket/ChatButtonsBegone',
        version: '3.2.2',
    },
    defaultConfig: [
        {
            type: 'category',
            name: 'Chat Bar',
            id: 'chatbar',
            collapsible: true,
            shown: true,
            settings: [
                {
                    type: 'switch',
                    id: 'attachButton',
                    name: 'Remove Attach Button',
                    note: 'Removes the Attach button from the chatbar.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'giftButton',
                    name: 'Remove Gift/Boost Button',
                    note: 'Removes the Gift Nitro/Boost Server button from the chatbar.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'gifButton',
                    name: 'Remove GIF Button',
                    note: 'Removes the GIF button from the chatbar.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'stickerButton',
                    name: 'Remove Sticker Button',
                    note: 'Removes the Sticker button from the chatbar.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'emojiButton',
                    name: 'Remove Emoji Button',
                    note: 'Removes the Emoji button from the chatbar.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'appLauncherButton',
                    name: 'Remove App Launcher Button',
                    note: 'Removes the App Launcher button from the chatbar.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Message Actions',
            id: 'messageActions',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'quickReactions',
                    name: 'Remove Quick Reactions',
                    note: 'Removes the quick reactions from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'reactionButton',
                    name: 'Remove Reaction Button',
                    note: 'Removes the "Add Reaction" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'superReactionButton',
                    name: 'Remove Super Reaction Button',
                    note: 'Removes the "Add Super Reaction" button from the message actions.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'editButton',
                    name: 'Remove Edit Button',
                    note: 'Removes the "Edit" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'replyButton',
                    name: 'Remove Reply Button',
                    note: 'Removes the "Reply" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'forwardButton',
                    name: 'Remove Forward Button',
                    note: 'Removes the "Forward" button from the message actions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'addReactionButton',
                    name: 'Remove "Add Reaction" Button On Messages',
                    note: 'Removes the "Add Reaction" button that appears next to messages that already has reactions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'removeMore',
                    name: 'Remove "More" Button',
                    note: 'Removes the "More" (three dots) button from the message actions.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Direct Messages',
            id: 'dms',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'quickSwitcher',
                    name: 'Remove Quick Switcher',
                    note: 'Removes the quick switcher ("Find or start a conversation") from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'friendsTab',
                    name: 'Remove Friends Tab',
                    note: 'Removes the friends tab from the DM list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'premiumTab',
                    name: 'Remove Nitro Tab',
                    note: 'Removes the Nitro tab from the DM list.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'discordShopTab',
                    name: 'Remove Shop Tab',
                    note: 'Removes the Shop tab from the DM list.',
                    value: true,
                },
                {
                    type: 'dropdown',
                    id: 'DMHeader',
                    name: 'DM Header',
                    note: 'Controls the visibility of the DM header. "Show" shows the header, "Remove Button" removes the \'Create DM\' button, "Remove Text" removes the header text, "Remove" removes the entire header.',
                    value: 'show',
                    options: [
                        { label: "Show", value: 'show' },
                        { label: "Remove Button", value: 'hideButton' },
                        { label: "Remove Text", value: 'hideText' },
                        { label: "Remove", value: 'remove' },
                    ],
                },
                {
                    type: 'dropdown',
                    id: 'activeNow',
                    name: 'Active Now Section',
                    note: 'Controls the visibility of the "Active Now" section in the Friends tab. "Remove" removes the section, "Simplify" removes Twitch and Rich Presence blocks.',
                    value: 'show',
                    options: [
                        { label: "Show", value: 'show' },
                        { label: "Simplify", value: 'simplify' },
                        { label: "Remove When Empty", value: 'empty' },
                        { label: "Simplify + Remove When Empty", value: 'simplifyempty' },
                        { label: "Remove", value: 'remove' },
                    ],
                },
            ],
        },
        {
            type: 'category',
            name: 'Servers',
            id: 'servers',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'serverBanner',
                    name: 'Remove Server Banner',
                    note: 'Removes the Server Banner Image/Container from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'boostBar',
                    name: 'Remove Boost Bar',
                    note: 'Removes the boost progress bar from the channel list.',
                    value: true,
                },
                {
                    type: 'switch',
                    id: 'serverGuide',
                    name: 'Remove Server Guide',
                    note: 'Removes the Server Guide button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'eventButton',
                    name: 'Remove Event Button',
                    note: 'Removes the Event button from the channel list. Note: Does not remove any events that are "Happening Now."',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'membersButton',
                    name: 'Remove Members Button',
                    note: 'Removes the Members button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'channelsAndRoles',
                    name: 'Remove Channels / Roles Button',
                    note: 'Removes the Channels / Roles button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'boostsButton',
                    name: 'Remove Server Boosts Button',
                    note: 'Removes the Server Boosts button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'shopButton',
                    name: 'Remove Shop Button',
                    note: 'Removes the Server Shop button from the channel list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'inviteButton',
                    name: 'Remove Invite Button',
                    note: 'Removes the invite button when hovering over channel list entries.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'activitySection',
                    name: 'Remove Activities Section',
                    note: 'Removes the Activities Section from the server member list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'addServerButton',
                    name: 'Remove "Add a Server" Button',
                    note: 'Removes the "Add a Server" button from the server list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'discoverButton',
                    name: 'Remove Discover Button',
                    note: 'Removes the "Discover" button from the server list.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'newIndicator',
                    name: 'Remove Top/Bottom "New" indicator',
                    note: 'Removes the "New" indicator that appears at the top or bottom of the server list when there are new notifications.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Voice',
            id: 'voice',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'invitePlaceholder',
                    name: 'Remove Solo Invite Panel',
                    note: 'Removes the Invite/Activites Panel when only user in Voice.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'cameraPanelButton',
                    name: 'Remove Camera Panel Button',
                    note: 'Removes the camera button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'screensharePanelButton',
                    name: 'Remove Screenshare Panel Button',
                    note: 'Removes the screenshare button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'activityPanelButton',
                    name: 'Remove Activity Panel Button',
                    note: 'Removes the activity button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'soundboardPanelButton',
                    name: 'Remove Soundboard Panel Button',
                    note: 'Removes the soundboard button from the voice chat panel in the bottom left.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'krispButton',
                    name: 'Remove Noise Suppression (Krisp) Button',
                    note: 'Removes the noise supression button from the user voice chat panel.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'gameActivityPanel',
                    name: 'Remove Game Activity Panel',
                    note: 'Removes the current game activity panel from the user voice chat panel.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'voiceAvatars',
                    name: 'Remove Server Voice Chat Avatars',
                    note: 'Removes the avatars of users in voice chats in servers.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Title Bar',
            id: 'toolbar',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'navButtons',
                    name: 'Remove Navigation Buttons',
                    note: 'Removes the forward/back navigation buttons from the top left of the title bar.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'locator',
                    name: 'Remove Title Bar Text',
                    note: 'Removes the "locator" text in the title bar that shows the current server/DM.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'checkpointButton',
                    name: 'Remove Checkpoint Button',
                    note: 'Removes the Checkpoint button.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'inboxButton',
                    name: 'Remove Inbox Button',
                    note: 'Removes the Inbox button.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'helpButton',
                    name: 'Remove Help Button',
                    note: 'Removes the Help button.',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Profile Customizations',
            id: 'profileCustomizations',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'namePlate',
                    name: 'Remove Nameplates',
                    note: 'Removes nameplates from members in the member list.',
                    value: false,
                },
                {
                    type: 'dropdown',
                    id: 'clanTag',
                    name: 'Clan Tag',
                    note: 'Controls the visibility of the Clan Tags. "Remove in Member List" removes it in member lists (Server/DM and messages), "Remove in Profile" removes it in profiles, "Remove" removes it everywhere.',
                    value: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in Member List', value: 'memberlist' },
                        { label: 'Remove in Profile', value: 'profile' },
                        { label: 'Remove', value: 'global' },
                    ],
                },
                {
                    type: 'dropdown',
                    id: 'avatarDecoration',
                    name: 'Avatar Decoration',
                    note: 'Controls the visibility of avatar decorations. "Remove in Member List" removes it in member lists (Server/DM and messages), "Remove in Profile" removes it in profiles, "Remove" removes it everywhere.',
                    value: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in Member List', value: 'memberlist' },
                        { label: 'Remove in Profile', value: 'profile' },
                        { label: 'Remove', value: 'global' },
                    ],
                },
                {
                    type: 'switch',
                    id: 'hideBadges',
                    name: 'Remove Profile Badges',
                    note: 'Removes the badges from user profiles.',
                    value: false,  
                },
                {
                    type: 'switch',
                    id: 'profileEffects',
                    name: 'Remove Profile Effects',
                    note: 'Removes profile effects (Animated Overlays) from user profiles.',
                },
            ],
        },
        {
            type: 'category',
            name: 'Miscellaneous',
            id: 'miscellaneous',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'nitroUpsell',
                    name: 'Remove Nitro Advertising',
                    note: 'Removes Nitro advertising thoughout various parts of Discord. Note: May not remove all of them.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'noQuests',
                    name: 'Remove Quests',
                    note: 'Removes Quest related popups and interactions.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'placeholderText',
                    name: 'Remove Placeholder Text in message area',
                    note: 'Removes the placeholder text "Message ..." in the chat bar.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'avatarPopover',
                    name: 'Remove Status Reply/React Popover',
                    note: 'Removes the buttons when you hover over a user\'s status.',
                    value: false,
                },
                {
                    type: 'dropdown',
                    id: 'listSeparator',
                    name: 'Remove DM/Server Channel List Separator',
                    note: 'Controls the visibility of the separator line between the DM and server channel lists. "Show" shows the separator, "Semi-Smart Remove" attempts to remove it depending on your chosen settings in DMs and Servers, "Remove" removes it entirely.',
                    value: 'show',
                    options: [
                        { label: 'Show', value: 'show'},
                        { label: 'Remove in DM list', value: 'dmlist' },
                        { label: 'Remove in Server Channel list', value: 'serverlist' },
                        { label: 'Semi-Smart Remove', value: 'smart' },
                        { label: 'Remove', value: 'remove' },
                    ],
                },
                {
                    type: 'switch',
                    id: 'seasonalEvents',
                    name: 'Remove Seasonal Events',
                    note: 'Removes seasonal event tabs and buttons (i.e. Snowsgiving, Discord\'s Birthday, etc.).',
                    value: false,
                },
            ],
        },
        {
            type: 'category',
            name: 'Compatibility',
            id: 'compatibility',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'invisibleTypingButton',
                    name: 'Remove Invisible Typing Button',
                    note: 'Removes the button added by Strencher\'s InvisibleTyping plugin from the chat.',
                    value: false,
                },
            ],
        },
    ],
};

module.exports = class ChatButtonsBegone {
    constructor(meta) {
        this.api = new BdApi(meta.name);
        this.styler = new Styler(meta.name, this.api);
        this.settings = this.api.Data.load('settings') || {};

        this.settingVersion = this.api.Data.load('settingVersion') || '0.0.0';

        this.ensureDefaultSettings();
        this.migrateConfig();
    }

    compareVersions(a, b) {
        if (a.includes('/')) {
            a = a.split('/')[0];
        }
        if (b.includes('/')) {
            b = b.split('/')[0];
        }
        const aParts = a.split('.').map(Number);
        const bParts = b.split('.').map(Number);
        for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
            const aPart = aParts[i] || 0;
            const bPart = bParts[i] || 0;
            if (aPart > bPart) return 1;
            if (aPart < bPart) return -1;
        }
        return 0;
    }

    migrateConfig() {
        const migrations = [
            {
                to: '2.12.0',
                migrate: (config) => {
                    // Combine activeNow and simplifyActiveNow into the dropdown activeNow
                    if (config.dms.activeNow == true) {
                        config.dms.activeNow = 'remove';
                    } else if (config.dms.simplifyActiveNow == true) {
                        config.dms.activeNow = 'simplify'
                    } else {
                        config.dms.activeNow = 'show';
                    }
                    delete config.dms.simplifyActiveNow;

                    // Migrate old clanTag setting to dropdown
                    if (config.miscellaneous.clanTag == true) {
                        config.miscellaneous.clanTag = 'memberlist';
                    } else {
                        config.miscellaneous.clanTag = 'show';
                    }

                    return config;
                }
            },
            {
                to: '2.13.0',
                migrate: (config) => {
                    config.profileCustomizations = {};
                    if ('namePlate' in config.miscellaneous) {
                        config.profileCustomizations.namePlate = config.miscellaneous.namePlate;
                        delete config.miscellaneous.namePlate;
                    }
                    if ('clanTag' in config.miscellaneous) {
                        config.profileCustomizations.clanTag = config.miscellaneous.clanTag;
                        delete config.miscellaneous.clanTag;
                    }
                    if ('avatarDecoration' in config.miscellaneous) {
                        config.profileCustomizations.avatarDecoration = config.miscellaneous.avatarDecoration;
                        delete config.miscellaneous.avatarDecoration;
                    }
                    if ('hideBadges' in config.miscellaneous) {
                        config.profileCustomizations.hideBadges = config.miscellaneous.hideBadges;
                        delete config.miscellaneous.hideBadges;
                    }

                    return config;
                }
            },
            {
				to: '2.13.0',
				migrate: (config) => {
                    // Move charbar settings into their own category
                    config.chatbar = {}

					config.chatbar.attachButton = config.attachButton;
                    delete config.attachButton;
					
					config.chatbar.giftButton = config.giftButton;
					delete config.giftButton;
					
					config.chatbar.gifButton = config.gifButton;
					delete config.gifButton;
					
					config.chatbar.stickerButton = config.stickerButton;
					delete config.stickerButton;
					
					config.chatbar.emojiButton = config.emojiButton;
					delete config.emojiButton;
					
					config.chatbar.appLauncherButton = config.appLauncherButton;
					delete config.appLauncherButton;

					return config;
				}
			},
            {
                to: '3.1.0',
                migrate: (config) => {
                    config.voice.gameActivityPanel = config.miscellaneous.activityPanel;
                    delete config.miscellaneous.activityPanel;
                    
                    config.servers.addServerButton = config.miscellaneous.addServerButton;
                    delete config.miscellaneous.addServerButton;

                    config.servers.discoverButton = config.miscellaneous.discoverButton;
                    delete config.miscellaneous.discoverButton;

                    return config;
                }
            },
            {
                to: '3.2.0',
                migrate: (config) => {
                    config.servers.channelsAndRoles = config.servers.channelsAndRoles || config.servers.browseChannels;
                    delete config.servers.browseChannels;

                    return config;
                }
            },
        ];

        let currentVersion = this.settingVersion;
        migrations.forEach(migration => {
			if (this.compareVersions(currentVersion, migration.to) < 0) {
                this.settings = migration.migrate(this.settings);
				currentVersion = migration.to;
			}
		});
        this.api.Data.save('settings', this.settings);
        
        if (this.compareVersions(this.settingVersion, config.info.version) <= 0) {
            this.settingVersion = config.info.version;
            this.api.Data.save('settingVersion', this.settingVersion);
        }
    }

    ensureDefaultSettings() {
        for (const category of config.defaultConfig) {
            if (category.type === 'category') {
                if (!(category.id in this.settings)) {
                    this.settings[category.id] = {};
                }
                for (const setting of category.settings) {
                    if (!(setting.id in this.settings[category.id]) || this.settings[category.id][setting.id] == null) {
                        this.settings[category.id][setting.id] = setting.value;
                    }
                }
            } else {
                if (!(category.id in this.settings)) {
                    this.settings[category.id] = category.value;
                }
            }
        }

        this.api.Data.save('settings', this.settings);
    }

    addStyles() {
        /// Chat Buttons ///
        if (this.settings.chatbar.attachButton) this.styler.add('[class*="attachWrapper"]');

        if (this.settings.chatbar.giftButton &&
            this.settings.chatbar.gifButton &&
            this.settings.chatbar.stickerButton &&
            this.settings.chatbar.emojiButton &&
            this.settings.chatbar.appLauncherButton
        ) {
            // If all Chat Buttons are removed, hide the entire button container instead
            this.styler.add('[class*="channelTextArea"] [class*="buttons"]');
        } else {
            // Otherwise, hide individual buttons
            if (this.settings.chatbar.giftButton) {
                this.styler.add('[class*="channelTextArea"] [class*="buttons"] > [class*="container"]:has([class*="button"] [class*="buttonWrapper"]) svg:not([class*="sendIcon"])');
                this.styler.add('[class*="channelTextArea"] [class*="buttons"] > [class*="button"]:not([class$="buttonContainer"])');
            }
            if (this.settings.chatbar.gifButton) this.styler.add('[class*="channelTextArea"] [class*="buttons"] > div[class*="expression"]:not(:has([class*="stickerButton"], [class*="emojiButton"]))');
            if (this.settings.chatbar.stickerButton) this.styler.add('[class*="channelTextArea"] [class*="buttons"] > [class*="expression"]:has([class*="stickerButton"])');
            if (this.settings.chatbar.emojiButton) this.styler.add('[class*="channelTextArea"] [class*="buttons"] > [class*="expression"]:has([class*="emojiButton"])');
            if (this.settings.chatbar.appLauncherButton) this.styler.add('[class*="app-launcher-entrypoint"]');
        }

        /// Message Actions ///
        if (this.settings.messageActions.quickReactions &&
            this.settings.messageActions.reactionButton &&
            this.settings.messageActions.editButton &&
            this.settings.messageActions.replyButton &&
            this.settings.messageActions.forwardButton &&
            this.settings.messageActions.removeMore
        ) {
            // If all Message Actions are removed, hide the entire button container instead
            this.styler.add('div[data-list-item-id*="chat-messages"]>[class*="buttonContainer"]');
        } else {
            // Otherwise, hide individual buttons
            if (this.settings.messageActions.quickReactions) {
                this.styler.add('[class*="hoverBarButton"]:has(>div[class*="icon"]>div[class*="emoji"])');
                this.styler.add('[class*="message"] [class*="buttonsInner"] [class*="separator"]');
            }
            if (this.settings.messageActions.reactionButton) this.styler.add('[class*="hoverBarButton"]:has(svg>path[d*="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22ZM6.5"])');
            if (this.settings.messageActions.editButton) this.styler.add('[class*="hoverBarButton"]:has(svg>path[d*="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2"])');
            if (this.settings.messageActions.replyButton) this.styler.add('[class*="hoverBarButton"]:has(svg>path[d*="M2.3 7.3a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L5.42"])');
            if (this.settings.messageActions.forwardButton) this.styler.add('[class*="hoverBarButton"]:has(svg>path[d*="M21.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L18.58"])');
            if (this.settings.messageActions.removeMore) this.styler.add('[class*="hoverBarButton"]:has(svg>path[d*="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-2a2"])');
        }

        if (this.settings.messageActions.superReactionButton) this.styler.add('[id="emoji-picker-tab-panel"] [class*="header"] div:has([for="burst-reaction-toggle-button"])');
        if (this.settings.messageActions.addReactionButton) this.styler.add('[class*="reactions"] span:has(>[class*="reactionBtn"])');

        /// Direct Messages ///
        if (this.settings.dms.quickSwitcher) this.styler.add('[class*="privateChannels"] [class*="searchBar"]');
        if (this.settings.dms.friendsTab) this.styler.add('li:has([href="/channels/@me"])');
        if (this.settings.dms.premiumTab) this.styler.add('li:has([href="/store"])');
        if (this.settings.dms.discordShopTab) {
            this.styler.add('li:has([href="/shop"])');
            this.styler.add('[class*="profileButtons"] > div:has(button:not([aria-expanded]))');
        }
        
        if (this.settings.dms.DMHeader == 'hideButton') {
            this.styler.add('h2 > div[class*="privateChannelRecipientsInviteButtonIconContainer"]');
        } else if (this.settings.dms.DMHeader == 'hideText') {
            this.styler.add('[class*="privateChannelsHeaderContainer"] > [class*="headerText"]');
        } else if (this.settings.dms.DMHeader == 'remove') {
            this.styler.add('[class*="privateChannelsHeaderContainer"]');
        }
        
        if (this.settings.dms.activeNow == 'simplify') {
            this.styler.add('div[class*="inset"]:has(div[class*="twitchSection"])');
            this.styler.add('div[class*="inset"]:has(div[class*="activitySection"])');
        } else if (this.settings.dms.activeNow == 'empty') {
            this.styler.add('[class*="nowPlayingColumn"]:has([class*="emptyCard"])');
        } else if (this.settings.dms.activeNow == 'simplifyempty') {
            this.styler.add('div[class*="inset"]:has(div[class*="twitchSection"])');
            this.styler.add('div[class*="inset"]:has(div[class*="activitySection"])');
            this.styler.add('[class*="nowPlayingColumn"]:has([class*="emptyCard"])');
        } else if (this.settings.dms.activeNow == 'remove') {
            this.styler.add('[class*="nowPlayingColumn"]');
        }

        /// Servers ///
        if (this.settings.servers.boostBar) this.styler.add('div[id="channels"] > ul[class*="content"] div[class*="containerWithMargin"]:has(div[class*="progress"])');
        if (this.settings.servers.serverGuide) this.styler.add('li:has(div[id*="home-tab"] + div[class*="link"])');
        if (this.settings.servers.eventButton) this.styler.add('li:has(svg>path[d*="M7 1a1 1 0 0 1 1 1v.75c0 .14.11.25.25.25h7.5c.14 0"])');
        if (this.settings.servers.membersButton) this.styler.add('li:has(svg>path[d*="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5"])');
        if (this.settings.servers.channelsAndRoles) this.styler.add('li:has(svg>path[d*="M18.5 23c.88 0 1.7-.25 2.4-.69l1.4 1.4a1"])');
        if (this.settings.servers.boostsButton) this.styler.add('li:has(div[id*="skill-trees"])');
        if (this.settings.servers.inviteButton) {
            this.styler.add('[class*="headerContent"][class*="primaryInfo"]>span:not([class*="hiddenVisually"])');
            this.styler.add('[class*="linkTop"]>[class*="children"]>span:first-of-type');
            this.styler.add('[class*="linkTop"]>[class*="children"]>span[class*="hiddenVisually"]:first-of-type');
        }
        if (this.settings.servers.shopButton) this.styler.add('div[class*="containerDefault"]:has(div[id*="shop"] + div[class*="link"])');
        if (this.settings.servers.activitySection) this.styler.add('[class*="membersGroup"]:has([role="button"]), [class*="member"] [class*="container"]:has([class*="badges"])');
        if (this.settings.servers.serverBanner) {
            this.styler.add('nav[class*="container"] > div[class*="bannerVisible"] > div[class*="animatedContainer"]');
            this.styler.add('nav[class*="container"] > div[id="channels"] > ul :is(div[style="height: 84px;"], div[style="height: 8px;"], div[style="height: 12px;"])');
        }
        if (this.settings.servers.addServerButton) this.styler.add('div[class*="itemsContainer"] > div[data-direction="vertical"] > div[class*="tutorialContainer"]:not(:first-child)');
        if (this.settings.servers.discoverButton) this.styler.add('div[class*="itemsContainer"] > div[data-direction="vertical"] > div[class*="listItem"]:has(+ div[aria-hidden="true"])');
        if (this.settings.servers.newIndicator) this.styler.add('nav div[class*="-unreadMentionsIndicator"]');

        /// Voice ///
        if (this.settings.voice.invitePlaceholder) this.styler.add('div[class*="singleUserRoot"]');
        if (this.settings.voice.cameraPanelButton) this.styler.add('section[class*="panels"] [class*="actionButtons"] button:first-of-type');
        if (this.settings.voice.screensharePanelButton) this.styler.add('section[class*="panels"] [class*="actionButtons"] button:nth-of-type(2)');
        if (this.settings.voice.activityPanelButton) this.styler.add('section[class*="panels"] [class*="actionButtons"] button:nth-of-type(3)');
        if (this.settings.voice.soundboardPanelButton) this.styler.add('section[class*="panels"] [class*="actionButtons"] span:has(svg)');
        if (this.settings.voice.krispButton) this.styler.add('section[class*="panels"] [class*="voiceButtonsContainer"] button:first-of-type');
        if (this.settings.voice.gameActivityPanel) this.styler.add('div[class*="activityPanel"]');
        if (this.settings.voice.voiceAvatars) this.styler.add('div[class*="voiceuser"] div[class*="userAvatar"]');

        /// Title Bar ///
        if (this.settings.toolbar.navButtons) this.styler.add('[class*="backForwardButtons"]');
        if (this.settings.toolbar.locator) this.styler.add('[class*="base"]>[class*="bar"]>[class*="title"]');
        if (this.settings.toolbar.checkpointButton) this.styler.add('[class*="button"]:has(>svg>path[d*="M5.1 1a2.1 2.1 0 0 1 1.8 3.14h14.05c.84"])');
        if (this.settings.toolbar.helpButton) this.styler.add('a[href="https://support.discord.com"]');
        if (this.settings.toolbar.inboxButton) this.styler.add('[class*="clickable"]:has(svg>path[d*="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3"])');
        
        /// Profile Customizations ///
        if (this.settings.profileCustomizations.namePlate) {
            // Server list
            this.styler.add('[class*="member"] [class*="nameplated"] [style*="linear-gradient"], [class*="container"]:has(> [class*="videoContainer"] video[src*="nameplate"])');
            // DM list
            this.styler.add('div[class*="interactive"]:hover>div[class*="container"]:has(img)');
            this.styler.add('div[class*="interactiveSelected"]>div[class*="container"]:has(img)');
        }

        if (this.settings.profileCustomizations.clanTag == 'memberlist') {
            this.styler.add('span[class*="clanTag"]');
        } else if (this.settings.profileCustomizations.clanTag == 'profile') {
            this.styler.add('span[class*="guildTagContainer"]');
        } else if (this.settings.profileCustomizations.clanTag == 'global') {
            this.styler.add('span[class*="clanTag"]');
            this.styler.add('span[class*="guildTagContainer"]');
        }

        if (this.settings.profileCustomizations.avatarDecoration == 'memberlist') {
            this.styler.add('div[class*="avatar"] [class*="avatarDecoration"]');
        } else if (this.settings.profileCustomizations.avatarDecoration == 'profile') {
            this.styler.add('div[class*="user-profile-popout"] div[class*="avatar"] [class*="avatarDecoration"]');
            this.styler.add('div[class*="profile"] div[class*="avatar"] [class*="avatarDecoration"]');
        } else if (this.settings.profileCustomizations.avatarDecoration == 'global') {
            this.styler.add('[class*="avatarDecoration"]');
        }

        if (this.settings.profileCustomizations.hideBadges) this.styler.add('[class*="tags"] > [class*="container"]');
        if (this.settings.profileCustomizations.profileEffects) this.styler.add('[class*="profileEffects"] img[class*="effect"]')

        /// Miscellaneous ///
        if (this.settings.miscellaneous.nitroUpsell) {
            // Settings "Edit Profile" Page
            this.styler.add('[class*="settingsPage"] div[class*="container"]:has([class*="artContainer"])');
            // Upsell in Profiles > Per-Server Profiles (Only should remove if user does not have Nitro)
            this.styler.add('[class*="profileButtons"]>span:first-of-type');
            // Billing Settings
            this.styler.add('[data-settings-sidebar-item="nitro_panel"], [data-settings-sidebar-item="premium_guild_subscriptions_panel"], [data-settings-sidebar-item="gift_panel"]');
        }
        if (this.settings.miscellaneous.placeholderText) this.styler.add('[class*="placeholder"][class*="slateTextArea"]');
        if (this.settings.miscellaneous.avatarPopover) this.styler.add('[class*="statusPopover"]');
        
        if (this.settings.miscellaneous.noQuests) {
            this.styler.add('li:has([href="/quest-home"])');
            // Active now section
            this.styler.add('div[class*="inset"]:has(div[class*="promotedTag"])');
        }

        let listSeparatorDm = '[class*="privateChannels"] [class*="sectionDivider"]';
        let listSeparatorServer = 'nav[class*="container"] [class*="sectionDivider"], nav[class*="container"] div[style="height: 0px;"] + div[style="height: 12px;"]';
        if (this.settings.miscellaneous.listSeparator == 'dmlist') {
            this.styler.add(listSeparatorDm);
        } else if (this.settings.miscellaneous.listSeparator == 'serverlist') {
            this.styler.add(listSeparatorServer);
        } else if (this.settings.miscellaneous.listSeparator == 'smart') {
            if (
                this.settings.dms.friendsTab &&
                this.settings.dms.premiumTab &&
                this.settings.dms.discordShopTab
            ) {
                this.styler.add(listSeparatorDm);
            }
            if (
                this.settings.servers.serverGuide &&
                this.settings.servers.eventButton &&
                this.settings.servers.membersButton &&
                this.settings.servers.channelsAndRoles &&
                this.settings.servers.boostsButton &&
                this.settings.servers.shopButton
            ) {
                this.styler.add(listSeparatorServer);
            }
        } else if (this.settings.miscellaneous.listSeparator == 'remove') {
            this.styler.add(listSeparatorDm);
            this.styler.add(listSeparatorServer);
        }

        if (this.settings.miscellaneous.seasonalEvents) this.styler.add('[href="//discord.com/snowsgiving"], [href="/activities"]');
        
        /// Compatibility ///
        if (this.settings.compatibility.invisibleTypingButton) this.styler.add('div[class*="buttons"] div:has([class*="invisibleTypingButton"])');

        this.styler.apply();
    }

    async start() {
        this.ensureDefaultSettings();

        try {
            this.addStyles();
        } catch (error) {
            this.api.Logger.error(`Failed to apply styles. Please report the following error to ${config.info.github}/issues :\n\n${error}`);
            BdApi.UI.showToast('ChatButtonsBegone encountered an error! Check the console for more information.',
                { type: 'error', timeout: '5000' }
            );
        }
    }

    stop() {
        this.styler.purge();
    }

    getSettingsPanel() {
        const settings = JSON.parse(JSON.stringify(config.defaultConfig));
        settings.forEach(setting => {
            if (setting.type === 'category') {
                setting.settings.forEach(subSetting => {
                    try {
                        subSetting.value = this.settings[setting.id][subSetting.id];    
                    } catch (error) {
                        this.api.Logger.error(error);
                    }
                });
            } else {
                setting.value = this.settings[setting.id];
            }
        });

        return this.api.UI.buildSettingsPanel({
            settings,
            onChange: (category, id, value) => {
                if (category !== null) {
                    try {
                        this.settings[category][id] = value;
                    } catch {
                        this.settings[category] = {};
                        this.settings[category][id] = value;
                    }
                } else {
                    this.settings[id] = value;
                }
                this.api.Data.save('settings', this.settings);
                
                // Don't refresh styles on core settings change
                if (category === 'core') return;
                
                this.styler.purge();
				this.addStyles();
				this.api.UI.showToast('Styles refreshed.', { type: 'info' });
            },
        });
    }
};
