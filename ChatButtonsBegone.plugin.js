/**
 * @name ChatButtonsBegone
 * @author LancersBucket
 * @description Remove annoying stuff from your Discord clients.
 * @version 3.4.0
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
        version: '3.4.0',
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
                }
            ]
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
                }
            ]
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
                    ]
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
                    ]
                },
                {
                    type: 'switch',
                    id: 'libraryTab',
                    name: 'Remove Library Tab',
                    note: 'Removes the Library tab from the DM list.',
                    value: false,
                }
            ]
        },
        {
            type: 'category',
            name: 'Servers and Channels',
            id: 'servers',
            collapsible: true,
            shown: false,
            settings: [
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
                    type: 'dropdown',
                    id: 'unreadIndicator',
                    name: 'Unread Mentions Indicator',
                    note: 'Controls the visibility of the Unread Mentions Indicators. "Remove Top" removes the Top Indicator, "Remove Bottom" removes the Bottom Indicator, "Remove Both" removes both Top and Bottom Indicators.',
                    value: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove Top', value: 'top' },
                        { label: 'Remove Bottom', value: 'bottom' },
                        { label: 'Remove Both', value: 'both' },
                    ]
                },
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
                    id: 'settingsButton',
                    name: 'Remove Settings Button',
                    note: 'Removes the settings button when hovering over channel list entries.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'activitySection',
                    name: 'Remove Activities Section',
                    note: 'Removes the Activities Section from the server member list.',
                    value: false,
                }
            ]
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
                    id: 'gameActivityButton',
                    name: 'Remove Game Activity Button',
                    note: 'Removes the suggested activities button from bottom voice chat panel.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'voiceAvatars',
                    name: 'Remove Server Voice Chat Avatars',
                    note: 'Removes the avatars of users in voice chats in servers.',
                    value: false,
                }
            ]
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
                }
            ]
        },
        {
            type: 'category',
            name: 'Profile Customizations',
            id: 'profileCustomizations',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'dropdown',
                    id: 'namePlate',
                    name: 'Remove Nameplates',
                    note: 'Removes nameplates from members in the member list.',
                    value: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in DMs/Members', value: 'original' },
                        { label: 'Remove in User Area', value: 'self' },
                        { label: 'Remove', value: 'global' },
                    ]
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
                    ]
                },
                {
                    type: 'switch',
                    id: 'avatarDecoration',
                    name: 'Avatar Decoration',
                    note: 'Controls the visibility of avatar decorations.',
                    value: false,
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
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'hideCollection',
                    name: 'Remove Profile Collection',
                    note: 'Removes the Game Collection from user profiles.',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'hideWishlist',
                    name: 'Remove Profile Wishlist',
                    note: 'Removes the Wishlist from user profiles.',
                    value: false,
                }
            ]
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
                    id: 'blockedMessage',
                    name: 'Remove Blocked Messages Indicator',
                    note: 'Removes the "blocked message(s)" insert in Chat',
                    value: false,
                },
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
                    ]
                },
                {
                    type: 'switch',
                    id: 'seasonalEvents',
                    name: 'Remove Seasonal Events',
                    note: 'Removes seasonal event tabs and buttons (i.e. Snowsgiving, Discord\'s Birthday, etc.).',
                    value: false,
                },
                {
                    type: 'switch',
                    id: 'ioChevrons',
                    name: 'Remove I/O Chevrons',
                    note: 'Removes the chevrons (arrows) from the I/O buttons in the user panel.',
                    value: false,
                }
            ]
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
                }
            ]
        }
    ]
};

module.exports = class ChatButtonsBegone {
    constructor(meta) {
        this.api = new BdApi(meta.name);
        this.styler = new Styler(meta.name, this.api);
        this.settings = this.api.Data.load('settings') || {};

        this.settingVersion = this.api.Data.load('settingVersion') || '0.0.0';

        this.ensureDefaultSettings();
        this.migrateConfig();

        [
            // Chat Bar
            this.attachButton,
            this.chatBarButtons,

            // Message Actions
            this.messageActionButtons,
            this.addReactionButton,
            this.messageActionContainer,

            // Direct Messages
            this.DMList,
            this.DMHeader,
            this.activeNowColumn,
            this.activeNowCards,
            this.activeNowEmpty,

            // Servers
            this.addServerDiscoverButton,
            this.indicatorTop,
            this.indicatorBottom,
            this.serverSideBar,
            this.boostBar,
            this.headerInviteButton,
            this.channelListButtons,
            this.serverActivitySection,
            this.serverActivitySectionCards,
            this.serverActivityOnHover,
            this.serverBanner,

            // Voice
            this.vcScreen,
            this.vcButtons,
            this.vcKrisp,
            this.vcActivityPanel,
            this.vcButtonSection,
            this.vcActivities,
            this.scSmallAvatar,

            // Title Bar
            this.backForwardButtons,
            this.titleBarTrailing,
            this.upperToolbar,

            // Profile Customizations
            this.namePlate,
            this.selfNamePlate,
            this.dmEntry,
            this.clanTagProfile,
            this.clanTagChiplet,
            this.clanTagChipletServer,
            this.avatar,
            this.avatarDecorationChat,
            this.profileBadges,
            this.profileEffects,
            this.profileCollection,
            this.profileWishlist,

            // Miscellaneous
            this.blockedGroup,
            this.blockedIndicator,
            this.shopArt,
            this.profileUpsell,
            this.txtPlaceholder,
            this.profilePopover,
            this.promotedQuest,
            this.questPrompt,
            this.dmDivider,
            this.channelDivider,
            this.iochevron
        ] = this.api.Webpack.getBulk(
            { filter: this.api.Webpack.Filters.byKeys('attachWrapper') }, // Attach Button
            { filter: this.api.Webpack.Filters.byKeys('channelTextArea', 'buttons') }, // Buttons Global
            
            { filter: this.api.Webpack.Filters.byKeys('hoverBarButton') }, // Message Action Buttons
            { filter: this.api.Webpack.Filters.byKeys('reactions', 'reactionBtn') }, // Message Add Reaction Button
            { filter: this.api.Webpack.Filters.byKeys('messageListItem', 'message', 'buttons') }, // Message Action Button
            
            { filter: this.api.Webpack.Filters.byKeys('privateChannels') }, // DM List
            { filter: this.api.Webpack.Filters.byKeys('privateChannelsHeaderContainer') }, // DM Header
            { filter: this.api.Webpack.Filters.byKeys('nowPlayingColumn') }, // Active Now Column
            { filter: this.api.Webpack.Filters.byKeys('activitySection') }, // Active Now Cards
            { filter: this.api.Webpack.Filters.byKeys('emptyCard') },  // Active Now Empty Card

            { filter: this.api.Webpack.Filters.byKeys('tutorialContainer') }, // Add Server / Discover Button
            { filter: this.api.Webpack.Filters.byKeys('unreadMentionsIndicatorTop') }, // Server Unread Mentions Indicator: Top
            { filter: this.api.Webpack.Filters.byKeys('unreadMentionsIndicatorBottom') }, // Server Unread Mentions Indicator: Bottom
            { filter: this.api.Webpack.Filters.byKeys('guilds', 'content') }, // Server Sidebar
            { filter: this.api.Webpack.Filters.byKeys('container', 'contentContainer', 'progressContainer') }, // Server Boost Bar
            { filter: this.api.Webpack.Filters.byKeys('inviteButton') }, // Header Invite Button
            { filter: this.api.Webpack.Filters.byKeys('linkTop','children') }, // Channel List Invite Button
            { filter: this.api.Webpack.Filters.byKeys('membersGroup') }, // Server Activity Section
            { filter: this.api.Webpack.Filters.byKeys('container', 'usesCardRows') }, // Server Activity Section Cards
            { filter: this.api.Webpack.Filters.byKeys('container', 'openOnHover') }, // Server Activity Section Cards
            { filter: this.api.Webpack.Filters.byKeys('bannerVisible', 'animatedContainer') }, // Server Banner

            { filter: this.api.Webpack.Filters.byKeys('singleUserRoot') }, // Invite Placeholder
            { filter: this.api.Webpack.Filters.byKeys('container', 'actionButtons') }, // VC Buttons
            { filter: this.api.Webpack.Filters.byKeys('voiceButtonsContainer') }, // Krisp Button
            { filter: this.api.Webpack.Filters.byKeys('activityPanel') }, // VC Activity Panel
            { filter: this.api.Webpack.Filters.byKeys('buttonSection', 'buttonContainer') },
            { filter: this.api.Webpack.Filters.byKeys('attachedCaretButtonContainer') },
            { filter: this.api.Webpack.Filters.byKeys('userSmall', 'avatarSmall') }, // VC Server Channel Avatars

            { filter: this.api.Webpack.Filters.byKeys('backForwardButtons') }, // Back/Forward Buttons
            { filter: this.api.Webpack.Filters.byKeys('trailing', 'title') }, // Trailing Buttons
            { filter: this.api.Webpack.Filters.byKeys('upperContainer', 'toolbar') }, // OldTitleBar Toolbar Buttons

            { filter: this.api.Webpack.Filters.byKeys('nameplated','container') }, // Nameplates
            { filter: this.api.Webpack.Filters.byKeys('container','fitInAccount') }, // Nameplates
            { filter: this.api.Webpack.Filters.byKeys('interactive','interactiveSelected') }, // DM Entry Item
            { filter: this.api.Webpack.Filters.byKeys('guildTagContainer') }, // Profile Clan Tag
            { filter: this.api.Webpack.Filters.byKeys('clanTagChiplet') }, // Clan Tag Chiplet
            { filter: this.api.Webpack.Filters.byKeys('chipletContainerInner','chipletContainerInline') }, // Clan Tag Chiplet in Server
            { filter: this.api.Webpack.Filters.byKeys('avatarDecorationContainer') }, // Avatar Decoration
            { filter: this.api.Webpack.Filters.byKeys('avatarDecoration','contents') }, // Avatar Decoration in Chat
            { filter: this.api.Webpack.Filters.byKeys('tags','usernameRow') }, // Profile Badges
            { filter: this.api.Webpack.Filters.byKeys('profileEffects') }, // Profile Effects
            { filter: this.api.Webpack.Filters.byKeys('cardsList', 'firstCardContainer') }, // Profile Game Collection
            { filter: this.api.Webpack.Filters.byKeys('wishlistBreadcrumb') }, // Popup Profile Wishlist

            { filter: this.api.Webpack.Filters.byKeys('groupStart') }, // Message Grouping Container
            { filter: this.api.Webpack.Filters.byKeys('blockedSystemMessage') }, // Blocked Message Indicator
            { filter: this.api.Webpack.Filters.byKeys('settingsPage') }, // Profile Shop Art
            { filter: this.api.Webpack.Filters.byKeys('upsellOverlayContainer') }, // Per_Server Nitro Upsell
            { filter: this.api.Webpack.Filters.byKeys('slateTextArea') }, // Placeholder Text
            { filter: this.api.Webpack.Filters.byKeys('statusPopover', 'statusPopover') }, // Profile Status Popover
            { filter: this.api.Webpack.Filters.byKeys('promotedTag') }, // Active Now Quests Promotion
            { filter: this.api.Webpack.Filters.byKeys('utils', 'heading', 'instructions') }, // Active Now Quest Prompt
            { filter: this.api.Webpack.Filters.byKeys('privateChannels', 'sectionDivider') }, // DMs List Divider
            { filter: this.api.Webpack.Filters.byKeys('scroller', 'sectionDivider') }, // Server Channel Divider
            { filter: this.api.Webpack.Filters.byKeys('buttonChevron') } // I/O Chevrons
        );
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
            {
                to: '3.3.0',
                migrate: (config) => {
                    if (config.profileCustomizations.avatarDecoration !== 'show') {
                        config.profileCustomizations.avatarDecoration = true;
                    } else {
                        config.profileCustomizations.avatarDecoration = false;
                    }
                    
                    return config;
                }
            },
            {
                to: '3.4.0',
                migrate: (config) => {
                    if (config.profileCustomizations.namePlate === true) {
                        config.profileCustomizations.namePlate = 'original';
                    } else {
                        config.profileCustomizations.namePlate = 'show';
                    }
                    
                    return config;
                }
            }
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
        if (this.settings.chatbar.attachButton) this.styler.add(`.${this.attachButton.attachWrapper}`);
        if (this.settings.chatbar.giftButton) this.styler.add(`.${this.chatBarButtons.buttons} > .${this.chatBarButtons.button}:not(.expression-picker-chat-input-button)`);
        if (this.settings.chatbar.gifButton) this.styler.add(`.expression-picker-chat-input-button:not(:has(.${this.chatBarButtons.stickerButton}, .${this.chatBarButtons.emojiButton.split(' ')[0]}))`);
        if (this.settings.chatbar.stickerButton) this.styler.add(`.expression-picker-chat-input-button:has(.${this.chatBarButtons.stickerButton})`);
        if (this.settings.chatbar.emojiButton) this.styler.add(`.expression-picker-chat-input-button:has(.${this.chatBarButtons.emojiButton.split(' ')[0]})`);
        if (this.settings.chatbar.appLauncherButton) this.styler.add('.app-launcher-entrypoint');

        /// Message Actions ///
        if (
            this.settings.messageActions.quickReactions &&
            this.settings.messageActions.reactionButton &&
            this.settings.messageActions.editButton &&
            this.settings.messageActions.replyButton &&
            this.settings.messageActions.forwardButton &&
            this.settings.messageActions.removeMore
        ) {
            this.styler.add(`.${this.messageActionContainer.message} .${this.messageActionContainer.buttons}`);
        }
        if (this.settings.messageActions.quickReactions) {
            this.styler.add(`.${this.messageActionButtons.hoverBarButton}:has(>.${this.messageActionButtons.icon}>[data-type="emoji"])`);
            this.styler.add(`.${this.messageActionButtons.separator}`);
        }
        if (this.settings.messageActions.reactionButton) this.styler.add(`.${this.messageActionButtons.hoverBarButton}:has(svg>path[d^="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22ZM6.5"])`);
        if (this.settings.messageActions.editButton) this.styler.add(`.${this.messageActionButtons.hoverBarButton}:has(svg>path[d^="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2"])`);
        if (this.settings.messageActions.replyButton) this.styler.add(`.${this.messageActionButtons.hoverBarButton}:has(svg>path[d^="M2.3 7.3a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L5.42"])`);
        if (this.settings.messageActions.forwardButton) this.styler.add(`.${this.messageActionButtons.hoverBarButton}:has(svg>path[d^="M21.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L18.58"])`);
        if (this.settings.messageActions.removeMore) this.styler.add(`.${this.messageActionButtons.hoverBarButton}:has(svg>path[d^="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-2a2"])`);

        if (this.settings.messageActions.addReactionButton) this.styler.add(`span:has(>.${this.addReactionButton.reactionBtn})`);

        /// Direct Messages ///
        if (this.settings.dms.quickSwitcher) this.styler.add(`.${this.DMList.privateChannels} [class^="searchBar"]`);
        if (this.settings.dms.friendsTab) this.styler.add('li:has([href="/channels/@me"])');
        if (this.settings.dms.premiumTab) this.styler.add('li:has([href="/store"])');
        if (this.settings.dms.discordShopTab) {
            this.styler.add('li:has([href="/shop"])');
        }

        if (this.settings.dms.DMHeader == 'hideButton') {
            this.styler.add(`.${this.DMHeader.privateChannelRecipientsInviteButtonIconContainer}`)
        } else if (this.settings.dms.DMHeader == 'hideText') {
            this.styler.add(`.${this.DMHeader.headerText}`);
        } else if (this.settings.dms.DMHeader == 'remove') {
            this.styler.add(`.${this.DMHeader.privateChannelsHeaderContainer}`);
        }

        if (this.settings.dms.activeNow == 'simplify') { 
            this.styler.add(`.${this.activeNowCards.body}:has(.${this.activeNowCards.twitchSectionPreview})`);
            this.styler.add(`.${this.activeNowCards.body}:has(.${this.activeNowCards.activitySection})`);
        } else if (this.settings.dms.activeNow == 'empty') {
            this.styler.add(`.${this.activeNowColumn}:has(.${this.activeNowEmpty.emptyCard})`);
        } else if (this.settings.dms.activeNow == 'simplifyempty') {
            this.styler.add(`.${this.activeNowCards.body}:has(.${this.activeNowCards.twitchSectionPreview})`);
            this.styler.add(`.${this.activeNowCards.body}:has(.${this.activeNowCards.activitySection})`);
            this.styler.add(`.${this.activeNowColumn.nowPlayingColumn}:has(.${this.activeNowEmpty.emptyCard})`);
        } else if (this.settings.dms.activeNow == 'remove') {
            this.styler.add(`.${this.activeNowColumn.nowPlayingColumn}`);
        }

        if (this.settings.dms.libraryTab) this.styler.add('li:has([href="/library"])');

        /// Servers and Channels ///
        if (this.settings.servers.addServerButton) this.styler.add(`.${this.addServerDiscoverButton.tutorialContainer}:not(:first-child)`);
        if (this.settings.servers.discoverButton) this.styler.add(`.${this.addServerDiscoverButton.tutorialContainer} + .${this.addServerDiscoverButton.listItem}`);

        if (this.settings.servers.unreadIndicator == 'both') {
            this.styler.add(`.${this.indicatorTop.unreadMentionsIndicatorTop}, .${this.indicatorBottom.unreadMentionsIndicatorBottom}`);
        } else if (this.settings.servers.unreadIndicator == 'top') {
            this.styler.add(`.${this.indicatorTop.unreadMentionsIndicatorTop}`);
        } else if (this.settings.servers.unreadIndicator == 'bottom') {
            this.styler.add(`.${this.indicatorBottom.unreadMentionsIndicatorBottom}`);
        }

        if (this.settings.servers.serverBanner) {
            this.styler.add(`.${this.serverBanner.animatedContainer}`);
            this.styler.add('div[id="channels"] > ul :is(div[style="height: 84px;"], div[style="height: 8px;"], div[style="height: 12px;"])');
        }
        if (this.settings.servers.boostBar) this.styler.add(`.${this.boostBar.container}`);
        if (this.settings.servers.serverGuide) this.styler.add('li:has(div[id*="home-tab"])');
        if (this.settings.servers.eventButton) this.styler.add('li:has(svg>path[d^="M7 1a1 1 0 0 1 1 1v.75c0 .14.11.25.25.25h7.5c.14 0"])');
        if (this.settings.servers.membersButton) this.styler.add('li:has(svg>path[d^="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5"])');
        if (this.settings.servers.channelsAndRoles) this.styler.add('li:has(svg>path[d^="M18.5 23c.88 0 1.7-.25 2.4-.69l1.4 1.4a1"])');
        if (this.settings.servers.boostsButton) this.styler.add('li:has(div[id*="skill-trees"])');
        if (this.settings.servers.shopButton) this.styler.add('div:has(> li > div > [id^="game-shop"])');
        if (this.settings.servers.inviteButton) {
            this.styler.add(`.${this.headerInviteButton.inviteButton}`);
            this.styler.add(`.${this.channelListButtons.children}>span:has(svg>path[d^="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1"])`);
        }
        if (this.settings.servers.settingsButton) this.styler.add(`.${this.channelListButtons.children}>span:has(svg>path[d^="M10.56 1.1c-.46.05-.7.53-.64.98.18 1.16-.19 2.2-.98"])`);
        if (this.settings.servers.activitySection) {
            this.styler.add(`.${this.serverActivitySection.membersGroup}:has([role="button"])`);
            this.styler.add(`div > div .${this.serverActivitySectionCards.usesCardRows}`);
            this.styler.add(`div > div .${this.serverActivityOnHover.container}.${this.serverActivityOnHover.openOnHover}`)
        }

        /// Voice ///
        if (this.settings.voice.invitePlaceholder) this.styler.add(`div[class^="row"]>div:has(.${this.vcScreen.singleUserRoot})`);
        if (this.settings.voice.cameraPanelButton) this.styler.add(`.${this.vcButtons.actionButtons} > button:first-of-type`);
        if (this.settings.voice.screensharePanelButton) this.styler.add(`.${this.vcButtons.actionButtons} > button:nth-of-type(2)`);
        if (this.settings.voice.activityPanelButton) this.styler.add(`.${this.vcButtons.actionButtons} > button:nth-of-type(3)`);
        if (this.settings.voice.soundboardPanelButton) this.styler.add(`.${this.vcButtons.actionButtons} span:has(svg)`);
        if (this.settings.voice.krispButton) this.styler.add(`.${this.vcKrisp.voiceButtonsContainer} button:first-of-type`);
        if (this.settings.voice.gameActivityPanel) this.styler.add(`.${this.vcActivityPanel.activityPanel}`);
        if (this.settings.voice.gameActivityButton) this.styler.add(`.${this.vcButtonSection.buttonContainer}:has(.${this.vcActivities.attachedCaretButtonContainer})`);
        if (this.settings.voice.voiceAvatars) this.styler.add(`.${this.scSmallAvatar.avatarSmall}`);

        /// Title Bar ///
        if (this.settings.toolbar.navButtons) this.styler.add(`.${this.backForwardButtons.backForwardButtons}`);
        if (this.settings.toolbar.locator) this.styler.add(`.${this.titleBarTrailing.title}`);
        if (this.settings.toolbar.checkpointButton) this.styler.add(`:is(.${this.titleBarTrailing.trailing}, .${this.upperToolbar.toolbar}) div:has(>svg>path[d^="M5.1 1a2.1 2.1 0 0 1 1.8 3.14h14.05c.84"])`);
        if (this.settings.toolbar.helpButton) this.styler.add(`:is(.${this.titleBarTrailing.trailing}, .${this.upperToolbar.toolbar}) a[href="https://support.discord.com"]`);
        if (this.settings.toolbar.inboxButton) this.styler.add(`:is(.${this.titleBarTrailing.trailing}, .${this.upperToolbar.toolbar}) div:has(svg>path[d^="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3"])`);

        /// Profile Customizations ///
        if (this.settings.profileCustomizations.namePlate == 'original') {
            // Server List / DM List
            this.styler.add(`.${this.namePlate.nameplated} > [style*="linear-gradient"], .${this.dmEntry.interactive} > [style*="linear-gradient"]`);
        } else if (this.settings.profileCustomizations.namePlate == 'self') {
            // Self Avatar Area
            this.styler.add(`.${this.selfNamePlate.fitInAccount}`);
        } else if (this.settings.profileCustomizations.namePlate == 'global') {
            // Server List / DM List
            this.styler.add(`.${this.namePlate.nameplated} > [style*="linear-gradient"], .${this.dmEntry.interactive} > [style*="linear-gradient"]`);
            // Self Avatar Area
            this.styler.add(`.${this.selfNamePlate.fitInAccount}`);
        }

        if (this.settings.profileCustomizations.clanTag == 'memberlist') {
            this.styler.add(`.${this.dmEntry.clanTag}`);
            this.styler.add(`.${this.clanTagChiplet.clanTagChiplet}`);
            this.styler.add(`.${this.clanTagChipletServer.chipletContainerInner}`);
        } else if (this.settings.profileCustomizations.clanTag == 'profile') {
            this.styler.add(`.${this.clanTagProfile.guildTagContainer}`);
        } else if (this.settings.profileCustomizations.clanTag == 'global') {
            // DM List
            this.styler.add(`.${this.dmEntry.clanTag}`);
            // DMs
            this.styler.add(`.${this.clanTagChiplet.clanTagChiplet}`);
            // Server List
            this.styler.add(`.${this.clanTagChipletServer.chipletContainerInner}`);
            // Profile
            this.styler.add(`.${this.clanTagProfile.guildTagContainer}`);
        }

        if (this.settings.profileCustomizations.avatarDecoration) {
            this.styler.add(`.${this.avatar.avatarDecorationContainer}`);
            this.styler.add(`.${this.avatarDecorationChat.avatarDecoration}`);
        }

        if (this.settings.profileCustomizations.hideBadges) this.styler.add(`.${this.profileBadges.tags} > div:has(a)`);
        if (this.settings.profileCustomizations.profileEffects) this.styler.add(`.${this.profileEffects.profileEffects} .${this.profileEffects.effect}`);
        if (this.settings.profileCustomizations.hideCollection) this.styler.add(`.${this.profileCollection.cardsList}:has([class^="breadcrumb"])`);
        if (this.settings.profileCustomizations.hideWishlist) this.styler.add(`.${this.profileWishlist.wishlistBreadcrumb}`);

        /// Miscellaneous ///
        if (this.settings.miscellaneous.blockedMessage) this.styler.add(`.${this.blockedGroup.groupStart}:has(.${this.blockedIndicator.blockedSystemMessage})`);

        if (this.settings.miscellaneous.nitroUpsell) {
            // Settings "Edit Profile" Page
            this.styler.add(`.${this.shopArt.settingsPage} div:has(>[class^="artContainer"])`);
            // Billing Settings
            this.styler.add('[data-settings-sidebar-item="nitro_panel"], [data-settings-sidebar-item="premium_guild_subscriptions_panel"], [data-settings-sidebar-item="gift_panel"]');
            // Upsell in Profiles > Per-Server Profiles (Only should remove if user does not have Nitro)
            this.styler.add(`.${this.profileUpsell.upsellOverlayContainer}`);
            // Profile Shop Button
            this.styler.add(`[class^="profile"] [class^="profileButtons"] > span:first-of-type`);
        }

        if (this.settings.miscellaneous.noQuests) {
            this.styler.add('li:has([href="/quest-home"])');
            // Active Now section
            this.styler.add(`.${this.promotedQuest.promotedTag}`);
            this.styler.add(`.${this.questPrompt.wrapper}`);
        }

        if (this.settings.miscellaneous.placeholderText) this.styler.add(`.${this.txtPlaceholder.slateTextArea}:has(+ .${this.txtPlaceholder.slateTextArea})`);
        if (this.settings.miscellaneous.avatarPopover) this.styler.add(`.${this.profilePopover.statusPopover}`);

        let listSeparatorDm = `.${this.dmDivider.sectionDivider}`;
        let listSeparatorServer = `.${this.channelDivider.sectionDivider}`;
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
        if (this.settings.miscellaneous.ioChevrons) this.styler.add(`.${this.iochevron.buttonChevron}`);

        /// Compatibility ///
        if (this.settings.compatibility.invisibleTypingButton) this.styler.add(`.${this.chatBarButtons.buttons} div:has(.invisibleTypingButton)`);

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
            }
        });
    }
};
