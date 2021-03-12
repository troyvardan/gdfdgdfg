module.exports = {
    BOT_SETTINGS: {
        BOT_TOKEN: 'ODE5NzY2OTA5NDA1NzU3NDQx.YErZbQ.TvpHr6CM6a4j2INa9uu6firwMuk',
        YT_API_KEY: 'AIzaSyA8iWsOkSH-tlL_Tb27MxnA2pC9C11RqpY',
        COMMAND_PREFIX: '?',
        EMBED_COLOR: 'BLUE',
        MUTE_ROLE: '809617747713327175',
        BANNED_WORDS: ['retard'],
        BYPASS_ROLES: [811336163834200071],
        BANNED_LINKS: ['www.', 'https://', '.com', '.net', '.gov', '.co', '.uk', '.gg', '.live'],
        BYPASS_LINKS_ROLES: ["761729736048640040"],
        Member_Count_Channel: '676021770289020929',
        Guild_ID: '802700035544317972',
        Kick_On_Warnings: true,
        Warnings_Until_Kick: '5',
        Time_Muted: '1m',
        Roles_On_Join: ["811336163624747083"]
    },
    VERIFICATION: {
        Enabled: false,
        Verify_Channel: 'CHANNELID',
        Verify_Role: 'ROLEID',
        Role_To_Remove: 'ROLEID'
    },
    USER_DMS: {
        Enabled: true,        
		Dm_Category: '',
        Dms: 'new-dm-{user}',
		Dm_Channel_Name: 'new-dm-{user}',
        View_Dmchannels_Roles:[``]
    },
    Ping_Prevention: {
        Enabled: true,
        Enabled_Types: 'user',
        Max_Channel_Pings: '5',
        Max_Role_Pings: '5',
        Max_User_Pings: '5',
        Max_Pings: '10',
        Punishment: 'kick',
        Bypass_Roles: [811336163834200071]
    },
    LOCKDOWN_KICK: {
        Enabled: false,
        Kick_Message: '{server} is currently in LOCKDOWN MODE! We have kicked you for the time, please try joining back later {member}. '
    },
    LEVELING_SYSTEM: {
        Enabled: false, 
        Remove_XP_On_Leave: false,
        Level_Up_Message: '{user} has just reached level {level}!',
        Level_Up_Channel_ID: '819769029685411840'
    },
    LOGGING: {
        Report_Channel: '819767672911822932',
        Ban_Channel_Logs: '819767412656308234',
        Unban_Channel_Logs: '819767412656308234',
        Kick_Channel_Logs: '8819767412656308234',
        Warn_Channel_Logs: '819767779086434304',
        Mute_Channel_Logs: '819767779086434304',
        Lock_Channel_Logs: '819767779086434304',
        Ticket_Channel_Logs: '819767894669918229',
        Moderation_Channel_Logs: '809617970673877012',
        Server_Updates: '809617971705937920',
        Voice_Updates: '809617971705937920'
    },
    TICKET_SYSTEM: {
        TICKET_CATEGORY: '819768775490273302',
        SUPPORT_TEAM_ROLES: '819768488130379776',
    },
    GREETING_SYSTEM: {
        Enabled: true,
        Welcome_Channel: '811336163834200073',
        Welcome_Type: 'card',
        Welcome_Cards_Image_Link: 'https://i.ibb.co/VmGzHKv/wwwwwwwwwwwwwwww.png',
        Welcome_Message: 'Welcome {member} to the server, You are our {joinPosition} member!',
        Welcome_Embed: {
            title: '{member.username} has just joined the server!',
            description: 'Welcome {member} to the server, You are our {joinPosition} member!',
            color: 'blue'
        }
    },
	EVOBOT: {
		  "TOKEN": "",
		"YOUTUBE_API_KEY": "AIzaSyA8iWsOkSH-tlL_Tb27MxnA2pC9C11RqpY",
		"SOUNDCLOUD_CLIENT_ID": "",
		"MAX_PLAYLIST_SIZE": 10,
		"PREFIX": "?",
		"PRUNING": false,
		"LOCALE": "en",
		"STAY_TIME": 30,
		"DEFAULT_VOLUME": 100
	}
}