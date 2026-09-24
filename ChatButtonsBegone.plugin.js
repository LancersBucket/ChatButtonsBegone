/**
 * @name ChatButtonsBegone
 * @author LancersBucket
 * @description Remove annoying stuff from your Discord client.
 * @version 4.5.5
 * @authorId 355477882082033664
 * @website https://github.com/LancersBucket/ChatButtonsBegone
 * @source https://raw.githubusercontent.com/LancersBucket/ChatButtonsBegone/refs/heads/main/ChatButtonsBegone.plugin.js
 */

class Styler {
    constructor(api) {
        this.api = api;
        this.styles = [];
        this.patches = [];
    }

    /**
     * Queue a style for the ChatButtonsBegone stylesheet. The style will be added when the webpack is loaded.
     * @param {string} selector CSS selector for the removal
     * @param {...any} modules A list of modules in the form [webpack1, property1, webpack2, property2,...]
     * @returns 
     */
    async add(selector, ...modules) {
        let mods = [];
        for (let i = 0; i < modules.length; i+=2) {
            const result = await modules[i];
            if (typeof result[modules[i+1]] !== 'string') {
                this.api.UI.showToast('ChatButtonsBegone detected an invalid webpack. Check the console for more information.', { type: 'warning', timeout: '5000' });
                this.api.Logger.warn(
                    `Invalid webpack detected. This may impact functionality of a setting you have enabled. ` + 
                    `Please report the following warning to ${config.info.github}/issues:` + 
                    `\n\nSelector "${selector}" contains an invalid webpack for module ${i} (.${modules[i+1]})`
                );
                return;
            }
            mods.push(result[modules[i+1]].trim().replace(' ', '.'));
        }
        this.styles.push(this.format(selector, ...mods));
        this.clear();
        this.apply();
    }

    /**
     * Queue a patch for the ChatButtonsBegone stylesheet. The style will be added when the webpack is loaded.
     * @param {string} cssPatch CSS changes
     * @param {string} selector CSS selector for the removal
     * @param {...any} modules A list of modules in the form [webpack1, property1, webpack2, property2,...]
     */
    async patch(cssPatch, selector, ...modules) {
        let mods = [];
        for (let i = 0; i < modules.length; i+=2) {
            const result = await modules[i];
            mods.push(result[modules[i+1]].trim().replace(' ', '.'));
        }
        this.patches.push([this.format(selector, ...mods), cssPatch]);
        this.clear();
        this.apply();
    }

    /**
     * Format a selector containing {n} tags and map them to to a provided list of modules.
     * @param {string} str A string containing {n} tags
     * @param {...any} args A list of modules in the form [webpack1, property1, webpack2, property2,...] 
     * @returns {string} The formatted string
     */
    format(str, ...args) {
        return str.replace(/{(\d+)}/g, (match, number) => {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }

    /**
     * Apply the styles and patches.
     */
    apply() {
        if (this.styles.length > 0) this.api.DOM.addStyle('ChatButtonsBegone-styles', `${this.styles.join(', ')} { display: none !important; }`);
        if (this.patches.length > 0) this.api.DOM.addStyle('ChatButtonsBegone-patches', this.patches.map(p => `${p[0]} { ${p[1]} }`).join(' '));
    }

    /**
     * Remove the styles and patches, and clear the buffers.
     */
    purge() {
        this.api.DOM.removeStyle('ChatButtonsBegone-styles');
        this.styles = [];

        this.api.DOM.removeStyle('ChatButtonsBegone-patches');
        this.patches = [];
    }

    /**
     * Remove the styles and patches, without clearing the buffers.
     */
    clear() {
        this.api.DOM.removeStyle('ChatButtonsBegone-styles');
        this.api.DOM.removeStyle('ChatButtonsBegone-patches');
    }
}

const config = {
    info: {
        github: 'https://github.com/LancersBucket/ChatButtonsBegone',
        version: '4.5.5',
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
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [{ selector: '.{0}', mods: [ m.attachButton, 'attachWrapper' ] }];
                    },
                },
                {
                    type: 'switch',
                    id: 'giftButton',
                    name: 'Remove Gift/Boost Button',
                    note: 'Removes the Gift Nitro/Boost Server button from the chatbar.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        // Current Implementation
                        { selector: '.{0} div[class^="container"]:has(> .{1})', mods: [ m.chatBarButtons, 'buttons', m.chatBarButtons, 'button' ] },
                        // Quick DM
                        { selector: '.{0} div:has(> button svg > path[d^="M4 6a4 4 0 0 1 4-4h.09c1.8 0 3.39 1.18 3.91"])', mods: [ m.textArea, 'channelTextArea' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'gifButton',
                    name: 'Remove GIF Button',
                    note: 'Removes the GIF button from the chatbar.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        // Chatbar
                        { selector: '.expression-picker-chat-input-button:not(:has(.{0}, .{1}))', mods: [ m.chatBarButtons, 'stickerButton', m.emojiButton, 'emojiButton' ] },
                        // Quick DM
                        { selector: '.{0} div:has(> button svg path[d^=" M-7,-10 C-8.656999588012695,-10"])', mods: [ m.textArea, 'channelTextArea' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'stickerButton',
                    name: 'Remove Sticker Button',
                    note: 'Removes the Sticker button from the chatbar.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.expression-picker-chat-input-button:has(.{0})', mods: [ m.chatBarButtons, 'stickerButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'emojiButton',
                    name: 'Remove Emoji Button',
                    note: 'Removes the Emoji button from the chatbar.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.expression-picker-chat-input-button:has(.{0})', mods: [ m.emojiButton, 'emojiButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'appLauncherButton',
                    name: 'Remove App Launcher Button',
                    note: 'Removes the App Launcher button from the chatbar.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.app-launcher-entrypoint' } ]; },
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
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        const rules = [];
                        if (v && s.messageActions.reactionButton && s.messageActions.editButton && s.messageActions.replyButton && s.messageActions.forwardButton && s.messageActions.removeMore) rules.push({ selector: '.{0} .{1}', mods: [ m.messageActionContainer, 'message', m.messageActionContainer, 'buttons' ] });
                        if (v) return rules.concat([
                            { selector: '.{0}:has(> .{1} > [data-type="emoji"])', mods: [ m.messageActionButtons, 'hoverBarButton', m.messageActionButtons, 'icon' ] },
                            { selector: '.{0}', mods: [ m.messageActionButtons, 'separator' ] },
                        ]);
                        return rules;
                    },
                },
                {
                    type: 'switch',
                    id: 'reactionButton',
                    name: 'Remove Reaction Button',
                    note: 'Removes the "Add Reaction" button from the message actions.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(svg > path[d^="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22ZM6.5"])', mods: [ m.messageActionButtons, 'hoverBarButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'editButton',
                    name: 'Remove Edit Button',
                    note: 'Removes the "Edit" button from the message actions.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(svg > path[d^="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2"])', mods: [ m.messageActionButtons, 'hoverBarButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'replyButton',
                    name: 'Remove Reply Button',
                    note: 'Removes the "Reply" button from the message actions.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(svg > path[d^="M2.3 7.3a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L5.42"])', mods: [ m.messageActionButtons, 'hoverBarButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'forwardButton',
                    name: 'Remove Forward Button',
                    note: 'Removes the "Forward" button from the message actions.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(svg > path[d^="M21.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L18.58"])', mods: [ m.messageActionButtons, 'hoverBarButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'addReactionButton',
                    name: 'Remove "Add Reaction" Button On Messages',
                    note: 'Removes the "Add Reaction" button that appears next to messages that already has reactions.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: 'div[id^="message-accessories"] > div[class^="reactions"] > span:has(div[class^="reactionBtn"])' },
                        { selector: 'ol[data-list-id="chat-messages"] div[class^="reactButtons"] > span:has(div[class^="reactionBtn"])' },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'removeMore',
                    name: 'Remove "More" Button',
                    note: 'Removes the "More" (three dots) button from the message actions.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(svg > path[d^="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-2a2"])', mods: [ m.messageActionButtons, 'hoverBarButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'removeBookmarkMessage',
                    name: 'Remove "Bookmark Message" Button',
                    note: 'Removes the "Bookmark Message" button from the message context menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'div[role="menuitem"][id="message-bookmark"]' } ]; },
                },
                {
                    type: 'switch',
                    id: 'removeCreateReminder',
                    name: 'Remove "Create Reminder" Button',
                    note: 'Removes the "Create Reminder" button from the message context menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'div[role="menuitem"][id="message-reminder"]' } ]; },
                },
                {
                    type: 'switch',
                    id: 'removeAppsContext',
                    name: 'Remove "Apps" Button',
                    note: 'Removes the "Apps" button from the message context menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'div:has(> div[role="menuitem"][id="message-apps"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'removeSpeakMessage',
                    name: 'Remove "Speak Message" Button',
                    note: 'Removes the "Speak Message" button from the message context menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'div[role="menuitem"][id="message-tts"]' } ]; },
                },
            ],
        },
        {
            type: 'category',
            name: 'Friends and Direct Messages',
            id: 'dms',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'quickSwitcher',
                    name: 'Remove Quick Switcher',
                    note: 'Removes the quick switcher ("Find or start a conversation") from the DM list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} [class^="searchBar"]', mods: [ m.DMList, 'privateChannels' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'friendsTab',
                    name: 'Remove Friends Tab',
                    note: 'Removes the friends tab from the DM list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'li:has([href="/channels/@me"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'premiumTab',
                    name: 'Remove Nitro Tab',
                    note: 'Removes the Nitro tab from the DM list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'li:has([href="/store"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'discordShopTab',
                    name: 'Remove Shop Tab',
                    note: 'Removes the Shop tab from the DM list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'li:has([href="/shop"])' } ]; },
                },
                {
                    type: 'dropdown',
                    id: 'DMHeader',
                    name: 'DM Header',
                    note: 'Controls the visibility of the DM header. "Show" shows the header, "Remove Button" removes the \'Create DM\' button, "Remove Text" removes the header text, "Remove" removes the entire header.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove Button', value: 'hideButton' },
                        { label: 'Remove Text', value: 'hideText' },
                        { label: 'Remove', value: 'remove' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'hideButton') return [ { selector: '.{0}', mods: [ m.DMHeader, 'privateChannelRecipientsInviteButtonIconContainer' ] } ];
                        else if (v === 'hideText') return [ { selector: '.{0}', mods: [ m.DMHeader, 'headerText' ] } ];
                        else if (v === 'remove') return [ { selector: '.{0}', mods: [ m.DMHeader, 'privateChannelsHeaderContainer' ] } ];
                    },
                },
                {
                    type: 'dropdown',
                    id: 'activeNow',
                    name: 'Active Now Section',
                    note: 'Controls the visibility of the "Active Now" section in the Friends tab. "Remove" removes the section, "Simplify" removes Twitch and Rich Presence blocks.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Simplify', value: 'simplify' },
                        { label: 'Remove When Empty', value: 'empty' },
                        { label: 'Simplify + Remove When Empty', value: 'simplifyempty' },
                        { label: 'Remove', value: 'remove' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'simplify' || v === 'simplifyempty') {
                            const rules = [
                                { selector: '.{0}:has(.{1})', mods: [ m.activeNowCards, 'body', m.activeNowCards, 'twitchSectionPreview' ] },
                                { selector: '.{0}:has(.{1})', mods: [ m.activeNowCards, 'body', m.activeNowCards, 'activitySection' ] },
                                { selector: '.{0}:has(.{1})', mods: [ m.activeNowCards, 'body', m.activeNowCards, 'gameSection' ] },
                            ];
                            if (v === 'simplifyempty') rules.push({ selector: '.{0}:has(.{1})', mods: [ m.activeNowColumn, 'nowPlayingColumn', m.activeNowEmpty, 'emptyCard' ] });
                            return rules;
                        }
                        if (v === 'empty') return [ { selector: '.{0}:has(.{1})', mods: [ m.activeNowColumn, 'nowPlayingColumn', m.activeNowEmpty, 'emptyCard' ] } ];
                        if (v === 'remove') return [ { selector: '.{0}', mods: [ m.activeNowColumn, 'nowPlayingColumn' ] } ];
                    },
                },
                {
                    type: 'dropdown',
                    id: 'userStatus',
                    name: 'Custom User Status',
                    note: 'Controls the visibility of custom User Status in DM and Server Member List. "Show" shows them, "Remove" removes them entirely.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show'},
                        { label: 'Remove in DM list', value: 'dmlist' },
                        { label: 'Remove in Server Member list', value: 'memberlist' },
                        { label: 'Remove', value: 'remove' },
                    ],
                    getRules: (v, s, m) => {
                        // DM List
                        const dm = { selector: 'div[class^="subText"]:has(> .{0} > .{1})', mods: [ m.dmStatus, 'textXs', m.dmlistStatus, 'activityStatusText' ] };
                        // Member List
                        const member = { selector: '.{0}:has(> .{1} > .{2})', mods: [ m.memberlistStatus, 'subText', m.dmStatus, 'textXs', m.memberStatusText, 'truncated' ] };
                        if (v === 'dmlist') return [ dm ];
                        if (v === 'memberlist') return [ member ];
                        if (v === 'remove') return [ dm, member ];
                    },
                },
                {
                    type: 'dropdown',
                    id: 'userActivity',
                    name: 'User Activity Status',
                    note: 'Controls the visibility of User Activity Status in DM and Server Member List. "Show" shows them, "Remove" removes them entirely.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show'},
                        { label: 'Remove in DM list', value: 'dmlist' },
                        { label: 'Remove in Server Member list', value: 'memberlist' },
                        { label: 'Remove', value: 'remove' },
                    ],
                    getRules: (v, s, m) => {
                        // DM List
                        const dm = { selector: '[class^="channel_"] div[class^="subText"]:has(> .{0} > span > .{0} > .{1})', mods: [ m.dmStatus, 'textXs', m.memberStatusText, 'truncated' ] };
                        // Member List
                        const member = { selector: '[class^="memberInner"] .{0}:has(.{1} .{1} > .{2})', mods: [ m.memberlistStatus, 'subText', m.dmStatus, 'textXs', m.memberStatusText, 'truncated' ] };
                        if (v === 'dmlist') return [ dm ];
                        if (v === 'memberlist') return [ member ];
                        if (v === 'remove') return [ dm, member ];
                    },
                },
                {
                    type: 'switch',
                    id: 'defaultFLStatus',
                    name: 'Remove Friends Tab Default Status',
                    note: 'Removes the Default Online Status sub-text from Friends.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [ { selector: '.{0} .{1}:has(> [class^="text_"])', mods: [ m.friendInfo, 'userInfo', m.friendInfo, 'subtext' ] } ];
                    },
                },
                {
                    type: 'switch',
                    id: 'customFLStatus',
                    name: 'Remove Friends Tab Custom Status',
                    note: 'Removes the Custom Status sub-text from Friends.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '.{0} .{1}:has(> .{2} > div)', mods: [ m.friendInfo, 'userInfo', m.friendInfo, 'subtext', m.friendTextSm, 'textSm' ] },
                        { selector: '.{0} .{1}:has(> .{2} > span > .{2})', mods: [ m.friendInfo, 'userInfo', m.friendInfo, 'subtext', m.friendTextSm, 'textSm' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'defaultFLActivity',
                    name: 'Remove Friends Tab Activity Sub-Status',
                    note: 'Removes the Activity sub-text from Friends.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        // Missing?
                    },
                },
                {
                    type: 'switch',
                    id: 'libraryTab',
                    name: 'Remove Library Tab',
                    note: 'Removes the Library tab from the DM list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'li:has([href="/library"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'pinDM',
                    name: 'Remove "Pin" Option From DM Context Menu',
                    note: 'Removes the "Pin" option from the DM context menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        // DMs
                        { selector: 'div[role="separator"] + div > div[id$="user-context-pin-dm"]' },
                        { selector: 'div[role="separator"]:has(+ div > div[id$="user-context-pin-dm"])' },
                        // GDMs
                        { selector: 'div[role="separator"] + div > div[id$="gdm-context-pin-dm"]' },
                        { selector: 'div[role="separator"]:has(+ div > div[id$="gdm-context-pin-dm"])' },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'groupDM',
                    name: 'Remove "Invite to Group DM" Button',
                    note: 'Removes the "Invite to Group DM" Button from existing Group DM MemberList area.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.groupDM, 'inviteToGroupButton' ] } ]; },
                },
            ],
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
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.addServerDiscoverButton, 'tutorialContainer' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'discoverButton',
                    name: 'Remove Discover Button',
                    note: 'Removes the "Discover" button from the server list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} + .{1}', mods: [ m.addServerDiscoverButton, 'tutorialContainer', m.addServerDiscoverButton, 'listItem' ] } ]; },
                },
                {
                    type: 'dropdown',
                    id: 'unreadIndicator',
                    name: 'Unread Mentions Indicator',
                    note: 'Controls the visibility of the Unread Mentions Indicators. "Remove Top" removes the Top Indicator, "Remove Bottom" removes the Bottom Indicator, "Remove Both" removes both Top and Bottom Indicators.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove Top', value: 'top' },
                        { label: 'Remove Bottom', value: 'bottom' },
                        { label: 'Remove Both', value: 'both' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'both') return [ { selector: '.{0}, .{1}', mods: [ m.serverIndicatorTop, 'unreadMentionsIndicatorTop', m.serverIndicatorBottom, 'unreadMentionsIndicatorBottom' ] } ];
                        else if (v === 'top') return [ { selector: '.{0}', mods: [ m.serverIndicatorTop, 'unreadMentionsIndicatorTop' ] } ];
                        else if (v === 'bottom') return [ { selector: '.{0}', mods: [ m.serverIndicatorBottom, 'unreadMentionsIndicatorBottom' ] } ];
                    },
                },
                {
                    type: 'switch',
                    id: 'serverBanner',
                    name: 'Remove Server Banner',
                    note: 'Removes the Server Banner Image/Container from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '.{0}', mods: [ m.serverBanner, 'animatedContainer' ] },
                        { selector: 'div#channels > ul :is(div[style="height: 84px;"], div[style="height: 8px;"], div[style="height: 12px;"])' },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'boostBar',
                    name: 'Remove Boost Bar',
                    note: 'Removes the boost progress bar from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.boostBar, 'container' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'stageNotice',
                    name: 'Remove "Live Now" Notice',
                    note: 'Removes the "Live Now" Notice from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.liveNotice, 'channelNotice' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'serverGuide',
                    name: 'Remove Server Guide',
                    note: 'Removes the Server Guide button from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '#channels li:has(div[id*="home-tab"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'eventButton',
                    name: 'Remove Event Button',
                    note: 'Removes the Event button from the channel list. Note: Does not remove any events that are "Happening Now."',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '#channels li:has(svg > path[d^="M7 1a1 1 0 0 1 1 1v.75c0 .14.11.25.25.25h7.5c.14 0"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'membersButton',
                    name: 'Remove Members Button',
                    note: 'Removes the Members button from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '#channels li:has(svg > path[d^="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'channelsAndRoles',
                    name: 'Remove Channels / Roles Button',
                    note: 'Removes the Channels / Roles button from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '#channels li:has(svg > path[d^="M18.5 23c.88 0 1.7-.25 2.4-.69l1.4 1.4a1"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'boostsButton',
                    name: 'Remove Server Boosts Button',
                    note: 'Removes the Server Boosts button from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'li:has(div[id*="skill-trees"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'shopButton',
                    name: 'Remove Shop Button',
                    note: 'Removes the Server Shop button from the channel list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '#channels li:has(> div > [data-list-item-id*="shop"])' } ]; },
                },
                {
                    type: 'switch',
                    id: 'inviteButton',
                    name: 'Remove Invite Button',
                    note: 'Removes the invite button when hovering over channel list entries.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '.{0}', mods: [ m.headerInviteButton, 'inviteButton' ] },
                        { selector: '.{0} > span:has(svg > path[d^="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1"])', mods: [ m.channelListButtons, 'children' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'showallButton',
                    name: 'Remove "Show All" Button',
                    note: 'Removes the VC "Show All" button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.vcShowAllButton, 'refreshVoiceChannelsButton' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'settingsButton',
                    name: 'Remove Settings Button',
                    note: 'Removes the settings button when hovering over channel list entries.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} > span:has(svg > path[d^="M10.56 1.1c-.46.05-.7.53-.64.98.18 1.16-.19 2.2-.98"])', mods: [ m.channelListButtons, 'children' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'pinChannel',
                    name: 'Remove "Pin" Option From Channel Context Menu',
                    note: 'Removes the "Pin Channel to Top" option from the channel context menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'div[role="separator"] + div > div[id$="channel-context-pin-channel"]' } ]; },
                },
                {
                    type: 'switch',
                    id: 'unreadMentionsBar',
                    name: 'Remove "Unread Mentions" Notification',
                    note: 'Removes the per-Server/Channel List "Unread Mentions" Notification.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.channelMentionsBar, 'mentionsBar' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'unreadMessagesBar',
                    name: 'Remove "Unread Messages" Notification',
                    note: 'Removes the per-Server/Channel List "Unread Messages" Notification.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.channelMessagesBar, 'unreadBar' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'activitySection',
                    name: 'Remove Activities Section',
                    note: 'Removes the Activities section from the server member list.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '.{0}:has([role="button"])', mods: [ m.serverActivitySection, 'membersGroup' ] },
                        { selector: 'div > div .{0}', mods: [ m.serverActivitySectionCards, 'usesCardRows' ] },
                        { selector: 'div > div .{0}.{1}', mods: [ m.serverActivityOnHover, 'container', m.serverActivityOnHover, 'openOnHover' ] },
                        ];
                    },
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
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'div[class^="row"] > div:has(.{0})', mods: [ m.vcScreen, 'singleUserRoot' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'cameraPanelButton',
                    name: 'Remove Camera Panel Button',
                    note: 'Removes the camera button from the voice chat panel in the bottom left.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} > button:first-of-type', mods: [ m.vcButtons, 'actionButtons' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'screensharePanelButton',
                    name: 'Remove Screenshare Panel Button',
                    note: 'Removes the screenshare button from the voice chat panel in the bottom left.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} > button:nth-of-type(2)', mods: [ m.vcButtons, 'actionButtons' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'activityPanelButton',
                    name: 'Remove Activity Panel Button',
                    note: 'Removes the activity button from the voice chat panel in the bottom left.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} > button:nth-of-type(3)', mods: [ m.vcButtons, 'actionButtons' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'soundboardPanelButton',
                    name: 'Remove Soundboard Panel Button',
                    note: 'Removes the soundboard button from the voice chat panel in the bottom left.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} div:has(> button svg)', mods: [ m.vcButtons, 'actionButtons' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'krispButton',
                    name: 'Remove Noise Suppression (Krisp) Button',
                    note: 'Removes the noise supression button from the user voice chat panel.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} button:first-of-type', mods: [ m.vcKrisp, 'voiceButtonsContainer' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'gameActivityPanel',
                    name: 'Remove Game Activity Panel',
                    note: 'Removes the current game activity panel from the user voice chat panel.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.vcActivityPanel, 'activityPanel' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'gameActivityButton',
                    name: 'Remove Game Activity Button',
                    note: 'Removes the suggested activities button from bottom voice chat panel.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(.{1})', mods: [ m.vcButtonSection, 'buttonContainer', m.vcActivities, 'attachedCaretButtonContainer' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'soundboardButton',
                    name: 'Remove Soundboard Button',
                    note: 'Removes the Soundboard Button from the bottom voice chat panel.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} > .{1} + .{2}', mods: [ m.vcButtonSection, 'buttonSection', m.vcButtonSection, 'buttonContainer', m.vcActivities, 'attachedCaretButtonContainer' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'voiceAvatars',
                    name: 'Remove Server Voice Chat Avatars',
                    note: 'Removes the avatars of users in voice chats in servers.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.vcSmallAvatar, 'avatarSmall' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'voiceWasHere',
                    name: 'Remove Was Here From VC List',
                    note: 'Removes the Was Here/What You Missed in VC list.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.vcWasHere, 'row' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'voiceInviteToVoice',
                    name: 'Remove Invite To Voice From VC List',
                    note: 'Removes the Invite to Voice button that temporarily appears when joining a VC.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '.{0}:has(>.{1})', mods: [ m.vcInviteToVoice, 'animation', m.vcInviteToVoice, 'clickable' ] },
                        { selector: '.{0} .{1}', mods: [ m.vcOnCallInvite, 'bottomControls', m.vcOnCallInvite, 'edgeControls' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'voiceSetCustomStatus',
                    name: 'Remove Custom Status Subtitle From VC List',
                    note: 'Removes the Set Custom Status and Custom Status Subtitles from VC.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.vcSetCustomStatus, 'linkBottom' ] } ]; },
                },
                {
                    type: 'dropdown',
                    id: 'vcRTCpingWrap',
                    name: 'Remove Ping/Connection Status',
                    note: 'Removes the Ping and/or Connection Status indicators from Avatar Wrapper in VCs.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove Ping Button', value: 'rtcPing' },
                        { label: 'Remove Status Label', value: 'rtcStatus' },
                        { label: 'Remove Both', value: 'rtcPingStatus' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'rtcPing') return [ { selector: '.{0}', mods: [ m.vcRTCWrapper, 'clickablePing' ] } ];
                        else if (v === 'rtcStatus') return [ { selector: '.{0} > div[role="button"]', mods: [ m.vcRTCWrapper, 'labelWrapper' ] } ];
                        else if (v === 'rtcPingStatus') return [ { selector: '.{0}', mods: [ m.vcRTCWrapper, 'clickablePing' ] }, { selector: '.{0} > div[role="button"]', mods: [ m.vcRTCWrapper, 'labelWrapper' ] } ];
                    },
                },
            ],
        },
        {
            type: 'category',
            name: 'Title and Toolbar',
            id: 'toolbar',
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: 'switch',
                    id: 'navButtons',
                    name: 'Remove Navigation Buttons',
                    note: 'Removes the forward/back navigation buttons from the top left of the title bar.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.backForwardButtons, 'backForwardButtons' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'locator',
                    name: 'Remove Title Bar Text',
                    note: 'Removes the "locator" text in the title bar that shows the current server/DM (also removes the image).',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.titleBarTrailing, 'title' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'bookmarkButton',
                    name: 'Remove Bookmarks Button',
                    note: 'Removes the Bookmarks button (added by experiment 2026-03-message-bookmarks variant 2)',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: ':is(.{0}, .{1}) div:has(svg > path[d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16a1 1 0 0 1-1.67.74l-5.66-5.13a1 1 0 0 0-1.34 0l-5.66 5.13A1 1 0 0 1 4 20.99V5Z"])', mods: [ m.titleBarTrailing, 'trailing', m.upperToolbar, 'toolbar' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'inboxButton',
                    name: 'Remove Inbox Button',
                    note: 'Removes the Inbox button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: ':is(.{0}, .{1}) div:has(svg > path[d^="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3"])', mods: [ m.titleBarTrailing, 'trailing', m.upperToolbar, 'toolbar' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'helpButton',
                    name: 'Remove Help Button',
                    note: 'Removes the Help button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: ':is(.{0}, .{1}) a[href="https://support.discord.com"]', mods: [ m.titleBarTrailing, 'trailing', m.upperToolbar, 'toolbar' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'threadsButton',
                    name: 'Remove Threads Button',
                    note: 'Removes Threads button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(svg > path[d^="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1"])', mods: [ m.upperToolbar, 'iconWrapper' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'notifyButton',
                    name: 'Remove Notify Button',
                    note: 'Removes Notification Bell button.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        // Strike Through Bell
                        { selector: '.{0}:has(> svg > path[d^="M1.3 21.3a1 1 0 1 0 1.4 1.4l20-20a1"]) ', mods: [ m.upperToolbar, 'iconWrapper' ] },
                        // Regular Bell
                        { selector: '.{0}:has(> svg > path[d^="M9.7 2.89c.18-.07.32-.24.37-.43a2"]) ', mods: [ m.upperToolbar, 'iconWrapper' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'pinnedButton',
                    name: 'Remove Pins Button',
                    note: 'Removes Pinned Messages button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(> svg path[d^="M19.38 11.38a3 3 0 0 0 4.24 0l.03-.03a.5.5 0 0 0 0-.7L13.35.35a.5 0.5"]) ', mods: [ m.upperToolbar, 'iconWrapper' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'memberButton',
                    name: 'Remove Show/Hide Members Button',
                    note: 'Removes Show/Hide Members button. Also affects the DMs "Add to DM"',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(> svg > path[d^="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5"]) ', mods: [ m.upperToolbar, 'iconWrapper' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'voiceButton',
                    name: 'Remove Voice Call Button',
                    note: 'Removes Start Voice Call button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(svg > path[d="M13 7a1 1 0 0 1 1-1 4 4 0 0 1 4 4 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1-1-1Z"])', mods: [ m.upperToolbar, 'iconWrapper' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'videoButton',
                    name: 'Remove Video Call Button',
                    note: 'Removes Start Video Call button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(> svg > path[d^="M4 4a3 3 0 0 0-3 3v10a3"])', mods: [ m.upperToolbar, 'iconWrapper' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'profileButton',
                    name: 'Remove Show/Hide Profile Button',
                    note: 'Removes Show/Hide User Profile from DMs button.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(> svg > path[d^="M23 12.38c-.02.38-.45.58-.78.4a6.97 6.97 0 0 0-6.27-.08.54 0.54"])', mods: [ m.upperToolbar, 'iconWrapper' ] } ]; },
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
                    id: 'profileNoCustom',
                    name: 'Disable Profile Custom Theme',
                    note: 'Disables all Custom Theme elements from a Proflie (Popup, Full, and Sideber (DMs))',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) {
                            return [
                                {
                                    type: 'patch',
                                    selector: '[class*="custom-user-profile-theme"]',
                                    content:
                                        `--profile-gradient-primary-color: var(--background-surface-high) !important;
                                        --profile-gradient-secondary-color: var(--background-surface-high) !important;
                                        --profile-gradient-overlay-color: rgba(0, 0, 0, 0) !important;
                                        --profile-gradient-button-color: var(--background-mod-subtle) !important;
                                        --profile-gradient-modal-background-color: var(--background-base-lower) !important;
                                        --custom-theme-base-color-amount: unset !important;
                                        --custom-theme-text-color-amount: unset !important;
                                        --custom-theme-base-color-light-hsl: unset !important;
                                        --custom-theme-base-color-light: unset !important;
                                        --custom-theme-text-color-light: unset !important;
                                        --custom-theme-base-color-dark-hsl: unset !important;
                                        --custom-theme-base-color-dark: unset !important;
                                        --custom-theme-text-color-dark: unset !important;`,
                                    mods: [],
                                }
                            ]
                        }
                    }
                },
                {
                    type: 'switch',
                    id: 'profileDisableAll',
                    name: 'Disable All Profile Customizations',
                    note: 'Disables (Global) All following "(+)" Profile Customizations: Nameplates, ClanTag, Avatar/Frame Decorations, Badges, Banners, Profile Effects As well as Removes Collections, Activities, Stats, Wishlist, Custom Status',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        // See Related (+) rules
                    }
                },
                {
                    type: 'dropdown',
                    id: 'namePlate',
                    name: 'Remove Nameplates (+)',
                    note: 'Removes nameplates from members in the member list.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in DMs/Members', value: 'original' },
                        { label: 'Remove in User Area', value: 'self' },
                        { label: 'Remove', value: 'global' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'original' || v === 'global' || s.profileCustomizations.profileDisableAll) {
                            const rules = [
                                { selector: '.{0} > [style^="background: linear-gradient"]', mods: [ m.dmEntry, 'interactive' ] },
                                { selector: '.{0} > [style^="background: linear-gradient"]', mods: [ m.namePlate, 'nameplated' ] },
                            ];
                            if (v === 'global' || s.profileCustomizations.profileDisableAll) rules.push({ selector: '.{0}', mods: [ m.selfNamePlate, 'fitInAccount' ] });
                            return rules;
                        } else if (v === 'self') return [ { selector: '.{0}', mods: [ m.selfNamePlate, 'fitInAccount' ] } ];
                    },
                },
                {
                    type: 'dropdown',
                    id: 'clanTag',
                    name: 'Clan Tag (+)',
                    note: 'Controls the visibility of the Clan Tags. "Remove in Member List" removes it in member lists (Server/DM and messages), "Remove in Profile" removes it in profiles, "Remove" removes it everywhere.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in Member List', value: 'memberlist' },
                        { label: 'Remove in Profile', value: 'profile' },
                        { label: 'Remove', value: 'global' },
                    ],
                    getRules: (v, s, m) => {
                        const member = [
                            // Member List
                            { selector: '.{0}', mods: [ m.mlTagEntry, 'clanTag' ] },
                            // DM List
                            { selector: '.{0}', mods: [ m.dmTagEntry, 'clanTag' ] },
                            // VC Users List
                            { selector: '.{0} .{1}', mods: [ m.vcSmallAvatar, 'userSmall', m.containerChiplet, 'chipletParent' ] },
                            // Friends List
                            { selector: '.{0}.{1}', mods: [ m.clanTagFriendsList, 'chipletContainerInner', m.clanTagFriendsList, 'noTooltip' ] },
                        ];
                        const profile = [
                            // Chat
                            { selector: '.{0}', mods: [ m.clanTagChiplet, 'clanTagChiplet' ] },
                            // Profile
                            { selector: '.{0}', mods: [ m.clanTagProfile, 'guildTag' ] },
                            // DM's "Show Profile"
                            { selector: '.{0}', mods: [ m.clanTagProfile, 'guildTagPill' ] },
                        ];
                        if (v === 'memberlist') return member;
                        if (v === 'profile') return profile;
                        if (v === 'global' || s.profileCustomizations.profileDisableAll) {
                            if (s.compatibility.newOldProfiles) return member.concat(profile, [ { selector: '.badgeSection .clanTagContainer, .badgeSection .divider' } ]);
                            return member.concat(profile);
                        }
                    },
                },
                {
                    type: 'switch',
                    id: 'avatarDecoration',
                    name: 'Remove Avatar Decoration (+)',
                    note: 'Controls the visibility of avatar decorations.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v || s.profileCustomizations.profileDisableAll) return [
                        { selector: ':not(.{0} > div ) > .{1}', mods: [ m.avatarPreview, 'skuPreview', m.avatarDecorationContainer, 'avatarDecorationContainer' ] },
                        { selector: ':not(.{0} > div ) > .{1}', mods: [ m.avatarPreview, 'skuPreview', m.avatarDecorationChat, 'avatarDecoration' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'hideBadges',
                    name: 'Remove Profile Badges (+)',
                    note: 'Removes the badges from user profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v || s.profileCustomizations.profileDisableAll) {
                            const rules = [ { selector: 'div[class^="container"]:has(> a.{0} > img)', mods: [ m.profileBadges, 'anchor' ] } ];
                            if (s.compatibility.newOldProfiles) rules.push({ selector: '.headerInfo .profileBadges .profileBadgeWrapper:not(:has(.profileBadgeBirthday))' });
                            return rules;
                        }
                    },
                },
                {
                    type: 'switch',
                    id: 'hideBanner',
                    name: 'Remove Profile Banner (+)',
                    note: 'Removes the banner image from user profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v || s.profileCustomizations.profileDisableAll) {
                            return [
                                {
                                    type: 'patch',
                                    selector: '.{0} .{1}',
                                    content: `background-image: unset !important;`,
                                    mods: [ m.profileBanner, 'banner', m.profileBanner, 'fill' ],
                                }
                            ]
                        }
                    }
                },
                {
                    type: 'switch',
                    id: 'removeCutout',
                    name: 'Remove Profile Cutout',
                    note: 'Removes the Avatar cutout in the banner image/background from user profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v || s.profileCustomizations.profileDisableAll) {
                            return [
                                {
                                    type: 'patch',
                                    selector: '.{0} .{1}',
                                    content:
                                    `--custom-cutout-radius: 0px !important;
                                    --custom-cutout-x: unset !important;
                                    --custom-cutout-y: unset !important;`,
                                    mods: [ m.profileBanner, 'banner', m.profileBanner, 'fill' ],
                                }
                            ]
                        }
                    }
                },
                {
                    type: 'switch',
                    id: 'profileEffects',
                    name: 'Remove Profile Effects (+)',
                    note: 'Removes profile effects (Animated Overlays) from user profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v || s.profileCustomizations.profileDisableAll) return [ { selector: ':not(.{0} > div > div) > .{1}', mods: [ m.avatarPreview, 'skuPreview', m.profileEffects, 'profileEffects' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'profileGIF',
                    name: 'Remove "GIF" From Profile Banner',
                    note: 'Removes the "GIF" tag from user profiles that have an animated banner.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.profileGIF, 'gifTag' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'hideMessage',
                    name: 'Remove Message Input',
                    note: 'Removes the Send Message input area from user profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '[class^="footer"]:has(.{0})', mods: [ m.textArea, 'channelTextArea' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'hideEditProfile',
                    name: 'Remove Edit Profile',
                    note: 'Removes Edit Profile from Self Profile popup.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) {
                            const rules = [ { selector: '.user-profile-popout [class^="footer"]:has(button)' } ];
                            if (s.compatibility.newOldProfiles) rules.push({ selector: '.profileButtons > button:has(svg>path[d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z"])' });
                            return rules;
                        }
                    },
                },
                {
                    type: 'switch',
                    id: 'hideCollection',
                    name: 'Remove Profile Collection (+)',
                    note: 'Removes the Game Collection from user profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v || s.profileCustomizations.profileDisableAll) return [ { selector: '.{0} .{1}', mods: [ m.profileCards, 'cardsList', m.profileCollection, 'breadcrumb' ] } ]; },
                },
                {
                    type: 'dropdown',
                    id: 'hideProfileActivity',
                    name: 'Profile Activity Card (+)',
                    note: 'Removes the Activity card from user profiles.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in Popout Profile', value: 'hpaPopout' },
                        { label: 'Remove in DMs View Profile', value: 'hpaDMs' },
                        { label: 'Remove', value: 'hpaGlobal' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'hpaPopout') return [ { selector: ':not(.{0}) > .{1} .{2}:has( > article)', mods: [ m.profileWishBody, 'cards', m.profileCards, 'container', m.profileCards, 'firstCardContainer' ] } ];
                        else if (v === 'hpaDMs') return [ { selector: '.{0}:has(.{1} > article)', mods: [ m.profileWishBody, 'cards', m.profileCards, 'firstCardContainer' ] } ];
                        else if (v === 'hpaGlobal' || s.profileCustomizations.profileDisableAll) return [ { selector: '.{0}:has(.{1} article)', mods: [ m.profileCards, 'container', m.profileCards, 'cardsList' ] } ];
                    },
                },
                {
                    type: 'dropdown',
                    id: 'hideProfileStats',
                    name: 'Profile Stats Card (+)',
                    note: 'Removes the Stats card from user profiles.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in Popout Profile', value: 'hpsPopout' },
                        { label: 'Remove in DMs View Profile', value: 'hpsDMs' },
                        { label: 'Remove', value: 'hpsGlobal' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'hpsPopout') return [ { selector: ':not(.{0}) > .{1} .{2}:has( > div)', mods: [ m.profileWishBody, 'cards', m.profileCards, 'container', m.profileCards, 'firstCardContainer' ] } ];
                        else if (v === 'hpsDMs') return [ { selector: '.{0} .{1} > div:has( > .{2})', mods: [ m.profileWishBody, 'cards', m.profileCards, 'firstCardContainer', m.profileCards, 'card' ] } ];
                        else if (v === 'hpsGlobal' || s.profileCustomizations.profileDisableAll) return [ { selector: '.{0} .{1} > div:has( > .{2})', mods: [ m.profileCards, 'container', m.profileCards, 'firstCardContainer', m.profileCards, 'card' ] } ];
                    },
                },
                {
                    type: 'switch',
                    id: 'hideWishlist',
                    name: 'Remove Profile Wishlist (+)',
                    note: 'Removes the Wishlist from user profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v || s.profileCustomizations.profileDisableAll) return [ { selector: '.{0} .{1}', mods: [ m.profileWishBody, 'cards', m.profileWishlist, 'container' ] } ]; },
                },
                {
                    type: 'dropdown',
                    id: 'hideStatus',
                    name: 'Profile Custom Status (+)',
                    note: 'Removes the Custom Status from user profiles.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show' },
                        { label: 'Remove in Popout Profile', value: 'hcsPopout' },
                        { label: 'Remove in DMs View Profile', value: 'hcsDMs' },
                        { label: 'Remove', value: 'hcsGlobal' },
                    ],
                    getRules: (v, s, m) => {
                        const popout = [
                            { selector: ':not([class^="previewContainer"]) > .user-profile-popout .{0}:has(.{1} > span.{2})', mods: [ m.profileCustomStatus, 'referenceContainer', m.profileCustomStatus, 'outer', m.profileCustomStatus, 'inner' ] },
                            { selector: ':not([class^="previewContainer"]) > .user-profile-popout .{0}:has(.{1} > span.{2})', mods: [ m.profileCustomStatus, 'container', m.profileCustomStatus, 'outer', m.profileCustomStatus, 'inner' ] },
                        ];
                        const dms = [
                            { selector: '.user-profile-sidebar .{0}:has(.{1} > span.{2})', mods: [ m.profileCustomStatus, 'referenceContainer', m.profileCustomStatus, 'outer', m.profileCustomStatus, 'inner' ] },
                            { selector: '.user-profile-sidebar .{0}:has(.{1} > span.{2})', mods: [ m.profileCustomStatus, 'container', m.profileCustomStatus, 'outer', m.profileCustomStatus, 'inner' ] },
                        ];
                        if (v === 'hcsPopout') return popout;
                        if (v === 'hcsDMs') return dms;
                        if (v === 'hcsGlobal' || s.profileCustomizations.profileDisableAll) return popout.concat(dms);
                    },
                },
                {
                    type: 'switch',
                    id: 'frameDecoration',
                    name: 'Remove Profile Frame Decoration (+)',
                    note: 'Removes the Frame Decoration from Profiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v || s.profileCustomizations.profileDisableAll) {
                        return [ 
                            { selector: '.{0} .{1}', mods: [ m.frameDecoration, 'profileFrameContainer', m.frameDecoration, 'profileFrame' ] },
                            // Patch out the resizing of the Profile to accommodate the Frame
                            {
                                type: 'patch',
                                selector: '.custom-profile-frame',
                                content: `--custom-profile-frame-container-width: unset !important;`,
                                mods: [],
                            }
                        ]; 
                    }
                },
                },
                {
                    type: 'switch',
                    id: 'hideClips',
                    name: 'Remove "Clips" from Status Menu',
                    note: 'Removes the "Clips" option from Profile Status menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '.{0} .{1}:has(svg path[d^="M15.74 5.74a.5.5 0 0 0 .54.7l5.01-.88a.5.5 0 0 0 .4-.58l-.26-1.47a3.0 0 0 0 0-3.2-2.47.46.46 0 0 0-.37.26l-2.12 4.44ZM15.13"])', mods: [ m.profileMenu, 'menuOverlay', m.profileMenu, 'menuItem' ] },
                        // Remove the Divider Gap from Status Select
                        { selector: '.{0} .{1}:has(+ .{1} svg path[d^="M15.74 5.74a.5.5 0 0 0 .54.7l5.01-.88a.5.5 0 0 0-.4-.58l-.26-1.47a3.0 0 0 0 0-3.2-2.47.46.46 0 0 0-.37.26l-2.12 4.44ZM15.13"])::after', mods: [ m.profileMenu, 'menuOverlay', m.profileMenu, 'menuItem' ] },
                        ];
                    },
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
                    id: 'blockedMessage',
                    name: 'Remove Blocked Messages Indicator',
                    note: 'Removes the "blocked message(s)" insert in Chat',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:has(.{1})', mods: [ m.blockedGroup, 'groupStart', m.blockedIndicator, 'blockedSystemMessage' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'nitroUpsell',
                    name: 'Remove Nitro Advertising',
                    note: 'Removes Nitro advertising thoughout various parts of Discord. Note: May not remove all of them.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        // Settings "Edit Profile" Page
                        { selector: '.{0} div:has(> [class^="artContainer"])', mods: [ m.shopArt, 'settingsPage' ] },
                        // Billing Settings (Context Menu)
                        { selector: '.{0} div[role="separator"]:has(+ div > #settings-menu-nitro_sidebar_item)', mods: [ m.contextSettingsMenu, 'menu' ] },
                        { selector: '.{0} div[role="group"]:has(#settings-menu-nitro_sidebar_item)', mods: [ m.contextSettingsMenu, 'menu' ] },
                        // Billing Settings (Context Menu / BetterSettings Plugin)
                        { selector: '.{0} div:has(> #settings-menu-Billing)', mods: [ m.contextSettingsMenu, 'menu' ] },
                        // Upsell in Profiles > Per-Server Profiles (Only should remove if user does not have Nitro)
                        { selector: '.{0}', mods: [ m.profileUpsell, 'upsellOverlayContainer' ] },
                        // Profile Shop Button
                        { selector: 'div[class^="profile"] [class^="profileButtons"] > span:has(svg > path[d^="M2.63 4.19A3A3 0 0 1 5.53 2H7a1 1 0 0"])' },
                        // "Add to Favorites" Right Click Menu Option and Separator
                        { selector: 'div[role="separator"] + div > div[id$="context-favorite-channel"]' },
                        { selector: 'div[role="separator"]:has(+ div > div[id$="context-favorite-channel"])' },
                        // Appearance Upsell
                        { selector: 'div[data-nav-anchor-key="appearance_custom_themes_upsell"]' },
                        // Nitro Rewards on Connections Page
                        { selector: 'div[class^="stack"] div[class^="sectionHeader"]:has(+ div[class^="theme-"][class*="images-"])' },
                        { selector: 'div[class^="stack"] div[class^="theme-"][class*="images-"]' },
                        // Profile Popup "Edit Profile" Sidebar
                        { selector: 'div:has(> .{0}, > .{1})', mods: [ m.profilePopupUpsell, 'nitro-pink', m.profilePopupUpsell, 'pink' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'noQuests',
                    name: 'Remove Quests',
                    note: 'Removes Quest related popups and interactions.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: 'li:has([href="/quest-home"])' },
                        // Active Now section
                        { selector: '.{0}', mods: [ m.promotedQuest, 'promotedTag' ] },
                        { selector: '.{0}', mods: [ m.questPrompt, 'wrapper' ] },
                        // MemberList Profile Popout Card Prompt
                        { selector: 'div[id^="popout"]:has(.{0})', mods: [ m.mlQuestPrompt, 'wrapper' ] },
                        // Avatar Wrapper
                        { selector: 'div:has(>div[data-testid="quest-bar-container"])' },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'noActvityMenu',
                    name: 'Remove Activity Context Section',
                    note: 'Removes Activity related entries from Settings context Menu.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '.{0} div[role="separator"]:has(+ div > #settings-menu-activity_privacy_sidebar_item)', mods: [ m.contextSettingsMenu, 'menu' ] },
                        { selector: '.{0} div[role="group"]:has(#settings-menu-activity_privacy_sidebar_item)', mods: [ m.contextSettingsMenu, 'menu' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'placeholderText',
                    name: 'Remove Placeholder Text In Message Area',
                    note: 'Removes the placeholder text "Message ..." in the chat bar.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}:not(.{1}) :has(+ .{2})', mods: [ m.textArea, 'channelTextArea', m.textArea, 'channelTextAreaDisabled', m.txtPlaceholder, 'slateTextArea' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'avatarPopover',
                    name: 'Remove Status Reply/React Popover',
                    note: 'Removes the buttons when you hover over a user\'s status.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.profilePopover, 'statusPopover' ] } ]; },
                },
                {
                    type: 'dropdown',
                    id: 'listSeparator',
                    name: 'Remove DM/Server Channel List Separator',
                    note: 'Controls the visibility of the separator line between the DM and server channel lists. "Show" shows the separator, "Semi-Smart Remove" attempts to remove it depending on your chosen settings in DMs and Servers, "Remove" removes it entirely.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show'},
                        { label: 'Remove in DM list', value: 'dmlist' },
                        { label: 'Remove in Server Channel list', value: 'serverlist' },
                        { label: 'Semi-Smart Remove', value: 'smart' },
                        { label: 'Remove', value: 'remove' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'dmlist') return [ { selector: '.{0}', mods: [ m.dmDivider, 'sectionDivider' ] } ];
                        else if (v === 'serverlist') return [ { selector: '.{0}', mods: [ m.channelDivider, 'sectionDivider' ] } ];
                        else if (v === 'remove') return [ { selector: '.{0}', mods: [ m.dmDivider, 'sectionDivider' ] }, { selector: '.{0}', mods: [ m.channelDivider, 'sectionDivider' ] } ];
                        else if (v === 'smart') {
                            const rules = [];
                            if (s.dms.friendsTab && s.dms.premiumTab && s.dms.discordShopTab && s.miscellaneous.noQuests) rules.push({ selector: '.{0}', mods: [ m.dmDivider, 'sectionDivider' ] });
                            if (s.servers.serverGuide && s.servers.eventButton && s.servers.membersButton && s.servers.channelsAndRoles && s.servers.boostsButton && s.servers.shopButton) rules.push({ selector: '.{0}', mods: [ m.channelDivider, 'sectionDivider' ] });
                            return rules;
                        }
                    },
                },
                {
                    type: 'switch',
                    id: 'seasonalEvents',
                    name: 'Remove Seasonal Events',
                    note: 'Removes seasonal event tabs and buttons (i.e. Snowsgiving, Discord\'s Birthday, etc.).',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        if (v) return [
                        { selector: '[href="//discord.com/snowsgiving"], [href="/activities"]' },
                        // Checkpoint Button
                        { selector: ':is(.{0}, .{1}) div:has(> svg > path[d^="M5.1 1a2.1 2.1 0 0 1 1.8 3.14h14.05c.84"])', mods: [ m.titleBarTrailing, 'trailing', m.upperToolbar, 'toolbar' ] },
                        // Last Meadow Online
                        { selector: ':is(.{0}, .{1}) div:has(> svg > path[fill^="url(#uid_)"])', mods: [ m.titleBarTrailing, 'trailing', m.upperToolbar, 'toolbar' ] },
                        ];
                    },
                },
                {
                    type: 'switch',
                    id: 'ioChevrons',
                    name: 'Remove I/O Chevrons',
                    note: 'Removes the chevrons (arrows) from the I/O buttons in the user panel.',
                    defaultValue: false,
                    getRules: (v, s, m) => { 
                        if (v) {
                            return [ 
                                { selector: '.{0}', mods: [ m.userAreaIOChevron, 'buttonChevron' ] },
                                {
                                    type: 'patch',
                                    selector: '.{0} .{1}',
                                    content: 
                                        `border-end-end-radius: 8px;
                                        border-start-end-radius: 8px;`,
                                    mods: [ m.userAreaIOChevron, 'audioButtonParent', m.userAreaIOChevron, 'audioButtonWithMenu' ],
                                }
                            ]; 
                        }
                    },
                },
                {
                    type: 'switch',
                    id: 'baseGradient',
                    name: 'Remove Chat/Typing Now Gradient',
                    note: 'Removes the gradient from the Chat Input/Now Typing area.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.textAreaGradient, 'chatGradientBase' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'noTypingDots',
                    name: 'Remove Chat/Typing Now animated "Dots"',
                    note: 'Removes the animated Dots from the Now Typing area.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0} > svg.{1}', mods: [ m.typingAnimDots, 'typingDots', m.typingAnimDots, 'ellipsis' ] } ]; },
                },
                {
                    type: 'dropdown',
                    id: 'tagsBotApp',
                    name: 'Remove APP/BOT Tags',
                    note: 'Removes the APP/Bot Tags from Bots in Memberslist/Messages.',
                    defaultValue: 'show',
                    options: [
                        { label: 'Show', value: 'show'},
                        { label: 'Keep Topic OP Tag', value: 'keepOP' },
                        { label: 'Remove Only In Chats', value: 'chatOnly' },
                        { label: 'Remove', value: 'remove' },
                    ],
                    getRules: (v, s, m) => {
                        if (v === 'remove') return [ { selector: '.{0}', mods: [ m.tagsBot, 'botTag' ] } ];
                        else if (v === 'keepOP') return [ { selector: '.{0}:not(.{1})', mods: [ m.tagsBot, 'botTag', m.tagsBot, 'botTagOP' ] } ];
                        else if (v === 'chatOnly') return [ { selector: '[id^="message-username"] > .{0}', mods: [ m.tagsBot, 'botTag' ] } ];
                    },
                },
                {
                    type: 'switch',
                    id: 'badgeNewUser',
                    name: 'Remove New User Badge',
                    note: 'Removes the New User badge from chat usernames area.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.badgeNew, 'newMemberBadge' ] } ]; },
                },
                {
                    type: 'switch',
                    id: 'threadSuggestions',
                    name: 'Remove "Create Thread" Suggestion',
                    note: 'Removes the "Create Thread" suggestion that appears when having a chain of 3 replies.',
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: '.{0}', mods: [ m.threadSuggestion, 'threadSuggestionBar' ] } ]; },
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
                    defaultValue: false,
                    getRules: (v, s, m) => { if (v) return [ { selector: 'div:has(> .invisibleTypingButton)' } ]; },
                },
                {
                    type: 'switch',
                    id: 'newOldProfiles',
                    name: 'NewOldProfiles Compatibility',
                    note: 'Enables compatibility with KingGamingYT\'s NewOldProfiles plugin. Modifies Clan Tag and Badges toggles to support NewOldProfiles.',
                    defaultValue: false,
                    getRules: (v, s, m) => {
                        // Skip. Does not change anything on its own.
                    }
                },
            ],
        },
    ],
};

module.exports = class ChatButtonsBegone {
    constructor(meta) {
        this.api = new BdApi(meta.name);
        this.styler = new Styler(this.api);
        this.settings = this.api.Data.load('settings') || {};

        this.settingVersion = this.api.Data.load('settingVersion') || '0.0.0';

        this.ensureDefaultSettings();
        this.migrateConfig();
    }

    migrateConfig() {
        const migrations = [
            {
                to: '4.1.0',
                migrate: (config) => {
                    // Migrate user status to DM settings
                    config.dms.userStatus = config.miscellaneous.userStatus;
                    delete config.miscellaneous.userStatus;

                    // Migrate user activity to DM settings
                    config.dms.userActivity = config.miscellaneous.userActivity;
                    delete config.miscellaneous.userActivity;

                    // Convert tagsBotApp to dropdown
                    config.miscellaneous.tagsBotApp = config.miscellaneous.tagsBotApp ? 'show' : 'remove';

                    return config;
                },
            },
            {
                to: '4.5.0',
                migrate: (config) => {
                    // Convert hideStatus to a dropdown
                    config.profileCustomizations.hideStatus = config.profileCustomizations.hideStatus ? 'show' : 'hcsGlobal';

                    return config;
                }
            },
            {
                to: '4.5.2',
                migrate: (config) => {
                    // Correct migrations by disabling both settings
                    config.profileCustomizations.hideStatus = 'show';
                    config.miscellaneous.tagsBotApp = 'show';

                    return config;

                }
            },
        ];

        const compareVersions = (a, b) => {
            const aParts = a.split('.').map(Number);
            const bParts = b.split('.').map(Number);

            for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
                if (aParts[i] > bParts[i]) return 1;
                if (aParts[i] < bParts[i]) return -1;
            }
            
            if (aParts.length !== bParts.length) {
                if (aParts.length > bParts.length) return 1;
                if (aParts.length < bParts.length) return -1;
            }
            
            return 0;
        }

        let currentVersion = this.settingVersion;
        let migrated = false;
        migrations.forEach((migration) => {
            if (compareVersions(currentVersion, migration.to) < 0) {
                this.settings = migration.migrate(this.settings);
                currentVersion = migration.to;
                migrated = true;
            }
        });
        if (migrated) this.api.Data.save('settings', this.settings);

        if (compareVersions(this.settingVersion, config.info.version) <= 0) {
            this.settingVersion = config.info.version;
            this.api.Data.save('settingVersion', this.settingVersion);
        }
    }

    ensureDefaultSettings() {
        const oldConfig = JSON.stringify(this.settings);
        for (let category of config.defaultConfig) {
            if (category.type === 'category') {
                if (!(category.id in this.settings)) this.settings[category.id] = {};

                for (let setting of category.settings) {
                    if (!(setting.id in this.settings[category.id]) || this.settings[category.id][setting.id] == null) {
                        this.settings[category.id][setting.id] = setting.defaultValue;
                    }
                }
            } else {
                if (!(category.id in this.settings)) this.settings[category.id] = category.value;
            }
        }

        if (oldConfig !== JSON.stringify(this.settings)) {
            this.api.Data.save('settings', this.settings);
        }
    }

    async addStyles() {
        let settingList = config.defaultConfig;

        for (let category in settingList) {
            let settingCategory = settingList[category].settings;
            for (let settingGroup in settingCategory) {
                let setting = settingCategory[settingGroup]

                let props = undefined
                try {
                    let settingValue = this.settings[settingList[category].id][setting.id]
                    props = setting.getRules(settingValue, this.settings, this.modules);
                } catch {
                    this.api.Logger.warn(`Warning: ${setting.name} has an invalid getRules. Skipping...`);
                    continue;
                }

                for (let prop in props) {
                    let currentProp = props[prop];

                    if ('type' in currentProp && currentProp['type'] === 'patch') {
                        if ('mods' in currentProp) {
                            this.styler.patch(currentProp.content, currentProp.selector, ...currentProp.mods);
                        } else {
                            this.styler.patch(currentProp.content, currentProp.selector);
                        }
                    } else {
                        if ('mods' in currentProp) {
                            this.styler.add(currentProp.selector, ...currentProp.mods);
                        } else {
                            this.styler.add(currentProp.selector);
                        }
                    }
                }
            }
        }

        this.styler.apply();
    }

    async start() {
        this.ensureDefaultSettings();

        this.modules = await this.waitForBulk(
            // Chat Bar //
            { name: 'textArea', filter: this.api.Webpack.Filters.byKeys('channelTextArea', 'channelTextAreaDisabled') }, // Text Input Area
            { name: 'attachButton', filter: this.api.Webpack.Filters.byKeys('attachWrapper') }, // Attach Button
            { name: 'chatBarButtons', filter: this.api.Webpack.Filters.byKeys('textArea', 'buttons') }, // Buttons Global
            { name: 'emojiButton', filter: this.api.Webpack.Filters.byKeys('emojiButtonNormal', 'emojiButton') }, // Emoji Button
            
            // Message Actions //
            { name: 'messageActionButtons', filter: this.api.Webpack.Filters.byKeys('hoverBarButton') }, // Message Action Buttons
            { name: 'messageActionContainer', filter: this.api.Webpack.Filters.byKeys('messageListItem', 'message', 'buttons') }, // Message Action Button
            
            // Direct Messages //
            { name: 'DMList', filter: this.api.Webpack.Filters.byKeys('privateChannels') }, // DM List
            { name: 'DMHeader', filter: this.api.Webpack.Filters.byKeys('privateChannelsHeaderContainer') }, // DM Header
            { name: 'groupDM', filter: this.api.Webpack.Filters.byKeys('inviteToGroupButton') }, // Invite to Group Button
            { name: 'activeNowColumn', filter: this.api.Webpack.Filters.byKeys('nowPlayingColumn') }, // Active Now Column
            { name: 'activeNowCards', filter: this.api.Webpack.Filters.byKeys('activitySection', 'gameSection') }, // Active Now Activity Cards
            { name: 'activeNowEmpty', filter: this.api.Webpack.Filters.byKeys('emptyCard', 'emptyHeader') }, // Active Now Empty Card
            { name: 'dmStatus', filter: this.api.Webpack.Filters.byKeys('textXs') }, // DMs List Activity/Status Container
            { name: 'dmlistStatus', filter: this.api.Webpack.Filters.byKeys('interactive', 'activityStatusText') }, // DMs List Activity/Status Text
            { name: 'dmlistText', filter: this.api.Webpack.Filters.byKeys('containerWithoutTruncatedText') }, // DMs List Status Text
            { name: 'memberlistStatus', filter: this.api.Webpack.Filters.byKeys('subText', 'childContainer') }, // Member List Activity/Status
            { name: 'memberStatusText', filter: this.api.Webpack.Filters.byKeys('truncated') }, // Member List Status Text
            { name: 'multiActivity', filter: this.api.Webpack.Filters.byKeys('activityContainer') }, // Multi-Activity Status Container
            { name: 'friendInfo', filter: this.api.Webpack.Filters.byKeys('userInfo', 'text', 'discordTag') }, // Friends Page UserInfo Sub-Status
            { name: 'friendTextSm', filter: this.api.Webpack.Filters.byKeys('textSm') }, // Friends Page UserInfo Sub-Text
            
            // Servers & Channels //
            { name: 'addServerDiscoverButton', filter: this.api.Webpack.Filters.byKeys('tutorialContainer', 'listItem') }, // Add Server / Discover Button
            { name: 'serverIndicatorTop', filter: this.api.Webpack.Filters.byKeys('unreadMentionsIndicatorTop') }, // Server Unread Mentions Indicator: Top
            { name: 'serverIndicatorBottom', filter: this.api.Webpack.Filters.byKeys('unreadMentionsIndicatorBottom') }, // Server Unread Mentions Indicator: Bottom
            { name: 'serverSideBar', filter: this.api.Webpack.Filters.byKeys('guilds', 'content') }, // Server Sidebar
            { name: 'boostBar', filter: this.api.Webpack.Filters.byKeys('container', 'contentContainer', 'progressContainer') }, // Server Boost Bar
            { name: 'liveNotice', filter: this.api.Webpack.Filters.byKeys('channelNotice') }, // Stage/Live Notice
            { name: 'headerInviteButton', filter: this.api.Webpack.Filters.byKeys('inviteButton') }, // Header Invite Button
            { name: 'channelListButtons', filter: this.api.Webpack.Filters.byKeys('linkTop', 'children') }, // Channel List Invite Button
            { name: 'serverActivitySection', filter: this.api.Webpack.Filters.byKeys('membersGroup') }, // Server Activity Section
            { name: 'serverActivitySectionCards', filter: this.api.Webpack.Filters.byKeys('container', 'usesCardRows') }, // Server Activity Section Cards
            { name: 'serverActivityOnHover', filter: this.api.Webpack.Filters.byKeys('container', 'openOnHover') }, // Server Activity Section Cards
            { name: 'serverBanner', filter: this.api.Webpack.Filters.byKeys('bannerVisible', 'animatedContainer') }, // Server Banner
            { name: 'vcShowAllButton', filter: this.api.Webpack.Filters.byKeys('refreshVoiceChannelsButton') }, // Show All Button
            { name: 'channelMentionsBar', filter: this.api.Webpack.Filters.byKeys('mentionsBar') }, // Unread Mentions Bar
            { name: 'channelMessagesBar', filter: this.api.Webpack.Filters.byKeys('unreadBar') }, // Unread Messages Bar
            
            // Voice //
            { name: 'vcScreen', filter: this.api.Webpack.Filters.byKeys('singleUserRoot') }, // Invite Placeholder
            { name: 'vcButtons', filter: this.api.Webpack.Filters.byKeys('wrapper', 'container', 'actionButtons') }, // VC Buttons
            { name: 'vcKrisp', filter: this.api.Webpack.Filters.byKeys('voiceButtonsContainer') }, // Krisp Button
            { name: 'vcActivityPanel', filter: this.api.Webpack.Filters.byKeys('activityPanel') }, // VC Activity Panel
            { name: 'vcButtonSection', filter: this.api.Webpack.Filters.byKeys('buttonSection', 'buttonContainer') },
            { name: 'vcActivities', filter: this.api.Webpack.Filters.byKeys('attachedCaretButtonContainer') },
            { name: 'vcSmallAvatar', filter: this.api.Webpack.Filters.byKeys('userSmall', 'avatarSmall') }, // VC Server Channel Avatars
            { name: 'vcWasHere', filter: this.api.Webpack.Filters.byKeys('row', 'avatarWrapper') }, // VC Server Channel Was Here
            { name: 'vcInviteToVoice', filter: this.api.Webpack.Filters.byKeys('animation', 'clickable') }, // VC Server Channel Invite to Voice
            { name: 'vcOnCallInvite', filter: this.api.Webpack.Filters.byKeys('videoControls', 'controlSection') }, // VC On-Call Invite to Voice
            { name: 'vcSetCustomStatus', filter: this.api.Webpack.Filters.byKeys('subtitle', 'linkBottom') }, // VC Server Channel Custom Status
            
            // Title Bar //
            { name: 'vcRTCWrapper', filter: this.api.Webpack.Filters.byKeys('rtcConnectionStatusWrapper') }, // VC Ping/Status Indicator/Wrapper
            { name: 'backForwardButtons', filter: this.api.Webpack.Filters.byKeys('backForwardButtons') }, // Back/Forward Buttons
            { name: 'titleBarTrailing', filter: this.api.Webpack.Filters.byKeys('trailing', 'title') }, // Title Buttons
            { name: 'upperToolbar', filter: this.api.Webpack.Filters.byKeys('upperContainer', 'toolbar', 'iconWrapper') }, // Toolbar Buttons
            
            // Profile Customizations
            { name: 'namePlate', filter: this.api.Webpack.Filters.byKeys('nameplated', 'container') }, // Nameplates
            { name: 'selfNamePlate', filter: this.api.Webpack.Filters.byKeys('container', 'fitInAccount') }, // Nameplates
            { name: 'dmEntry', filter: this.api.Webpack.Filters.byKeys('interactive', 'interactiveSelected') }, // DM Entry Item
            { name: 'mlTagEntry', filter: this.api.Webpack.Filters.byKeys('memberInner', 'clanTag') }, // Member List clanTag
            { name: 'dmTagEntry', filter: this.api.Webpack.Filters.byKeys('overflowTooltip', 'clanTag') }, // DM List clanTag
            { name: 'clanTagProfile', filter: this.api.Webpack.Filters.byKeys('guildTag', 'clickable') }, // Profile Clan Tag
            { name: 'clanTagChiplet', filter: this.api.Webpack.Filters.byKeys('clanTagChiplet') }, // Clan Tag Chiplet
            { name: 'containerChiplet', filter: this.api.Webpack.Filters.byKeys('container', 'chipletContainer') }, // Clan Tag Chiplet Container
            { name: 'clanTagFriendsList', filter: this.api.Webpack.Filters.byKeys('chipletContainerInner', 'noTooltip') }, // Friends List Clan Tag
            { name: 'avatarPreview', filter: this.api.Webpack.Filters.byKeys('skuPreview') }, // SKU Preview Exclusion
            { name: 'avatarDecorationContainer', filter: this.api.Webpack.Filters.byKeys('avatar', 'avatarDecorationContainer') }, // Avatar Decoration
            { name: 'avatarDecorationChat', filter: this.api.Webpack.Filters.byKeys('avatarDecoration', 'contents') }, // Avatar Decoration in Chat
            { name: 'profileBadges', filter: this.api.Webpack.Filters.byKeys('anchor', 'anchorUnderlineOnHover') }, // Profile Badges
            { name: 'profileBanner', filter: this.api.Webpack.Filters.byKeys('banner', 'fill') }, // Profile Banner
            { name: 'profileEffects', filter: this.api.Webpack.Filters.byKeys('profileEffects') }, // Profile Effects
            { name: 'profileGIF', filter: this.api.Webpack.Filters.byKeys('mask', 'gifTag') }, // Profile GIF Tag
            { name: 'profileCards', filter: this.api.Webpack.Filters.byKeys('container', 'cardsList', 'firstCardContainer') }, // Profile Cards List
            { name: 'profileCollection', filter: this.api.Webpack.Filters.byKeys('breadcrumb') }, // Game Collection Breadcrumb
            { name: 'profileWishBody', filter: this.api.Webpack.Filters.byKeys('body', 'cards') }, // Profile Activity/Wishlist Cards
            { name: 'profileWishlist', filter: this.api.Webpack.Filters.byKeys('container', 'cardsContainer') }, // Profile Wishlist
            { name: 'profileCustomStatus', filter: this.api.Webpack.Filters.byKeys('referenceContainer', 'container') }, // Profile Custom Status
            { name: 'frameDecoration', filter: this.api.Webpack.Filters.byKeys('profileFrameContainer', 'profileFrame') }, // Profile Frame Decoration
            { name: 'profileMenu', filter: this.api.Webpack.Filters.byKeys('menuOverlay', 'menuItem') }, // Self Profile Menu
            
            // Miscellaneous
            { name: 'blockedGroup', filter: this.api.Webpack.Filters.byKeys('groupStart') }, // Message Grouping Container
            { name: 'blockedIndicator', filter: this.api.Webpack.Filters.byKeys('blockedSystemMessage') }, // Blocked Message Indicator
            { name: 'shopArt', filter: this.api.Webpack.Filters.byKeys('settingsPage') }, // Profile Shop Art
            { name: 'contextSettingsMenu', filter: this.api.Webpack.Filters.byKeys('menu', 'flexible') }, // Nitro Context Menu
            { name: 'profileUpsell', filter: this.api.Webpack.Filters.byKeys('upsellOverlayContainer') }, // Per-Server Nitro Upsell
            { name: 'profilePopupUpsell', filter: this.api.Webpack.Filters.byKeys('nitro-pink', 'pink') }, // Profile Popup Nitro Sidebar
            { name: 'txtPlaceholder', filter: this.api.Webpack.Filters.byKeys('slateTextArea') }, // Placeholder Text
            { name: 'profilePopover', filter: this.api.Webpack.Filters.byKeys('statusPopover', 'statusPopover') }, // Profile Status Popover
            { name: 'promotedQuest', filter: this.api.Webpack.Filters.byKeys('promotedTag') }, // Active Now Quests Promotion
            { name: 'questPrompt', filter: this.api.Webpack.Filters.byKeys('wrapper', 'foreground', 'ctas') }, // Active Now Quest Prompt
            { name: 'mlQuestPrompt', filter: this.api.Webpack.Filters.byKeys('wrapper', 'container', 'top') }, // MemberList Profile Popout Card Prompt
            { name: 'dmDivider', filter: this.api.Webpack.Filters.byKeys('privateChannels', 'sectionDivider') }, // DMs List Divider
            { name: 'channelDivider', filter: this.api.Webpack.Filters.byKeys('scroller', 'sectionDivider') }, // Server Channel Divider
            { name: 'userAreaIOChevron', filter: this.api.Webpack.Filters.byKeys('buttonChevron') }, // I/O Chevrons
            { name: 'textAreaGradient', filter: this.api.Webpack.Filters.byKeys('chatGradient', 'chatGradientBase') }, // Chat Input Gradient
            { name: 'typingAnimDots', filter: this.api.Webpack.Filters.byKeys('typing', 'typingDots') }, // Animated Typing Dots
            { name: 'tagsBot', filter: this.api.Webpack.Filters.byKeys('botText', 'botTag') }, // APP/BOT Tags
            { name: 'badgeNew', filter: this.api.Webpack.Filters.byKeys('newMemberBadge') }, // New User Badge
            { name: 'threadSuggestion', filter: this.api.Webpack.Filters.byKeys('threadSuggestionBar') }, // Thread Suggestions
        )

        try {
            this.addStyles();
        } catch (error) {
            this.api.Logger.error(`Failed to apply styles. Please report the following error to ${config.info.github}/issues:\n\n${error}\n${error.stack}`);
            BdApi.UI.showToast('ChatButtonsBegone encountered an error! Check the console for more information.',
                { type: 'error', timeout: '5000' }
            );
        }
    }

    async waitForBulk(...modules) {
        let mods = {};
        
        for (let mod in modules) {
            mods[modules[mod].name] = this.api.Webpack.waitForModule(modules[mod].filter);
        }

        return mods;
    }

    stop() {
        this.styler.purge();
        this.api.DOM.removeStyle('ChatButtonsBegone-settings-panel');
    }

    getSettingsPanel() {
        // Aliases for setting filtering
        class Aliases {
            constructor() {
                this.aliases = [];
            }
            /**
             * Register an alias grouping of similar strings.
             * @param  {...string} aliasGroup A list of strings to be aliased
             */
            register(...aliasGroup) {
                this.aliases.push(aliasGroup.map(alias => alias.toLowerCase()));
            }
            /**
             * Return a list of aliases related to the provided term.
             * @param {string} term A search term
             * @returns {string[]|null} An alias grouping or null if no results are found
             */
            getAliases(term) {
                term = term.toLowerCase();
                for (const aliasGroup of this.aliases) {
                    for (const alias of aliasGroup) {
                        if (alias === term) return aliasGroup;
                    }
                };
                return null;
            }
        }
        
        // Custom setting styles
        const styles = `
            .ChatButtonsBegone-settings-search {
                position: sticky;
                top: 0;
                z-index: 1;
                margin: 0 0 1rem 0;
            }
            #ChatButtonsBegone-settings-panel .bd-settings-group~.bd-settings-group .bd-settings-title {
                margin-top: 0px !important;
            }
        `;
        this.api.DOM.addStyle('ChatButtonsBegone-settings-panel', styles);

        // Clone default config
        let settings = JSON.parse(JSON.stringify(config.defaultConfig));
        settings.forEach((category) => {
            category.settings.forEach((subSetting) => {
                subSetting.defaultValue = this.settings[category.id][subSetting.id];
            });
        });

        const createSettingsList = (filteredSettings) => {
            if (filteredSettings.length === 0) {
                return this.api.React.createElement(this.api.Components.Text,
                    { id: "ChatButtonsBegone-empty" },
                    `No results found. Can't find what you're looking for? Want a feature? Let us know at: `,
                    this.api.React.createElement('a',
                        {
                            href: `${config.info.github}/issues`,
                            target: '_blank',
                        },
                        `${config.info.github}/issues`,
                    ),
                );
            }

            return this.api.React.createElement("div",
                { id: "ChatButtonsBegone-settings-list" },
                filteredSettings.map((setting) => {
                    return this.api.React.createElement(this.api.Components.SettingGroup, {
                        key: `group-${setting.id}-${String(setting.shown)}`,
                        ...setting,
                        shown: setting.shown,
                        onChange: (category, id, value) => {
                            try {
                                this.settings[category][id] = value;
                            } catch {
                                this.settings[category] = {};
                                this.settings[category][id] = value;
                            }
                            this.api.Data.save('settings', this.settings);

                            // Don't refresh styles on core settings change
                            if (category === 'core') return;

                            this.styler.purge();
                            this.addStyles();
                            this.api.UI.showToast('Styles refreshed.', { type: 'info' });
                        },
                    });
                }),
            );
        }

        const SettingsPanel = () => {
            const aliases = new Aliases();
            aliases.register("voice", "vc", "vcs", "voice chat", "voice chats", "voice channel", "voice channels");
            aliases.register("dm", "dms", "direct message", "direct messages");
            aliases.register("gdm", "gdms", "group direct message", "group direct messages");
            aliases.register("chatbar", "chat bar", "typing area", "text area");
            aliases.register("title and toolbar", "title bar", "toolbar", "tool bar");
            aliases.register("servers and channels", "servers", "channels", "server", "channel");
            aliases.register("profile", "profile customization", "profile customizations");

            const [filteredSettings, setFilteredSettings] = this.api.React.useState(settings);

            const filterSettings = (searchTerm) => {
                const term = searchTerm.trim().toLowerCase();

                // If no search term is supplied, show default list
                if (!term) {
                    setFilteredSettings(settings);
                    return;
                }

                const filteredSettings = JSON.parse(JSON.stringify(settings));
                filteredSettings.forEach((category) => {
                    category.settings = category.settings.filter((subSetting) => {
                        // If the search term starts with an underscore, search by ID instead
                        if (term.startsWith("_")) {
                            // Append the ID to the name in ID mode for easier identification
                            subSetting.name += ` [${subSetting.id}]`;
                            return (
                                subSetting.id.toLowerCase().includes(term.slice(1)) ||
                                category.id.toLowerCase().includes(term.slice(1))
                            );
                        }

                        // Filters for the search to use
                        const filters = (word) => {
                            return (
                                // If the name of the setting includes the term
                                subSetting.name.toLowerCase().includes(word) ||
                                // If the description of the setting includes the term
                                subSetting.note.toLowerCase().includes(word) ||
                                // If the name of the category is equal to the term
                                category.name.toLowerCase() === word
                            );
                        }

                        // If the word has an alias, check all aliases for a match
                        if (aliases.getAliases(term)) {
                            for (const alias of aliases.getAliases(term)) {
                                if (filters(alias)) return true;
                            }
                        } else return filters(term); // Otherwise just check the term itself
                    });

                    // In filter mode, uncollapse all categories that have at least one setting
                    if (category.settings.length > 0) category.shown = true;
                });
                setFilteredSettings(filteredSettings.filter(category => category.settings.length > 0));
            };

            const numSettings = Object.keys(config.defaultConfig).reduce((acc, category) => acc + config.defaultConfig[category].settings.length, 0);
            return this.api.React.createElement("div",
                { id: "ChatButtonsBegone-settings-panel" },
                this.api.React.createElement(this.api.Components.SearchInput,
                    {
                        className: "ChatButtonsBegone-settings-search",
                        placeholder: `Search ${numSettings} settings...`,
                        onChange: e => filterSettings(e),
                    },
                ),
                createSettingsList(filteredSettings),
            );
        };

        return this.api.React.createElement(SettingsPanel);
    }
};
