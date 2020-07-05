import {
    initializeBlock,
    useBase,
    useRecords,
    useGlobalConfig,
    useSettingsButton,
    Box,
    Heading,
    ViewPickerSynced,
    RecordCard,
    TablePickerSynced,
    FormField,
    FieldPickerSynced,
    Button,
    Text, Icon,
    ViewportConstraint,
    colors,
    colorUtils,
    useSession,
    Dialog,
    SelectButtons,
    useViewport
} from '@airtable/blocks/ui';
import React, { useState, useRef } from 'react';
import { FieldType } from '@airtable/blocks/models';
import moment from 'moment';
import Iframe from 'react-iframe';
import { Container, Row, Col, Tabs, Tab, Toast } from 'react-bootstrap';
import { loadCSSFromURLAsync, CollaboratorToken } from '@airtable/blocks/ui';
import { Carousel } from 'react-responsive-carousel';
import { loadCSSFromString } from '@airtable/blocks/ui';
import { ScheduleClock } from './schedule_clock';
import parse from 'html-react-parser';
import ChatBox from 'react-chat-plugin';

loadCSSFromString('.slide > div > a {width:100% !important; min-height: 140px !important; overflow-y:auto !important;}.slide > div > a > div > div{display:block !important;} .carousel .control-arrow,.carousel.carousel-slider .control-arrow{-webkit-transition:all .25s ease-in;-moz-transition:all .25s ease-in;-ms-transition:all .25s ease-in;-o-transition:all .25s ease-in;transition:all .25s ease-in;opacity:.4;filter:alpha(opacity=40);position:absolute;z-index:2;top:20px;background:none;border:0;font-size:32px;cursor:pointer}.carousel .control-arrow:hover{opacity:1;filter:alpha(opacity=100)}.carousel .control-arrow:before,.carousel.carousel-slider .control-arrow:before{margin:0 5px;display:inline-block;border-top:8px solid transparent;border-bottom:8px solid transparent;content:\'\'}.carousel .control-disabled.control-arrow{opacity:0;filter:alpha(opacity=0);cursor:inherit;display:none}.carousel .control-prev.control-arrow{left:0}.carousel .control-prev.control-arrow:before{border-right:8px solid #000}.carousel .control-next.control-arrow{right:0}.carousel .control-next.control-arrow:before{border-left:8px solid #000}.carousel-root{outline:none}.carousel{position:relative;width:100%}.carousel *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.carousel img{width:100%;display:inline-block;pointer-events:none}.carousel .carousel{position:relative}.carousel .control-arrow{outline:0;border:0;background:none;top:50%;margin-top:-13px;font-size:18px}.carousel .thumbs-wrapper{margin:20px;overflow:hidden}.carousel .thumbs{-webkit-transition:all .15s ease-in;-moz-transition:all .15s ease-in;-ms-transition:all .15s ease-in;-o-transition:all .15s ease-in;transition:all .15s ease-in;-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);position:relative;list-style:none;white-space:nowrap}.carousel .thumb{-webkit-transition:border .15s ease-in;-moz-transition:border .15s ease-in;-ms-transition:border .15s ease-in;-o-transition:border .15s ease-in;transition:border .15s ease-in;display:inline-block;margin-right:6px;white-space:nowrap;overflow:hidden;border:3px solid #fff;padding:2px}.carousel .thumb:focus{border:3px solid #ccc;outline:none}.carousel .thumb.selected,.carousel .thumb:hover{border:3px solid #333}.carousel .thumb img{vertical-align:top}.carousel.carousel-slider{position:relative;margin:0;overflow:hidden}.carousel.carousel-slider .control-arrow{top:0;color:#fff;font-size:26px;bottom:0;margin-top:0;padding:5px}.carousel.carousel-slider .control-arrow:hover{background:rgba(0,0,0,0.2)}.carousel .slider-wrapper{overflow:hidden;margin:auto;width:100%;-webkit-transition:height .15s ease-in;-moz-transition:height .15s ease-in;-ms-transition:height .15s ease-in;-o-transition:height .15s ease-in;transition:height .15s ease-in}.carousel .slider-wrapper.axis-horizontal .slider{-ms-box-orient:horizontal;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-moz-flex;display:-webkit-flex;display:flex}.carousel .slider-wrapper.axis-horizontal .slider .slide{flex-direction:column;flex-flow:column}.carousel .slider-wrapper.axis-vertical{-ms-box-orient:horizontal;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-moz-flex;display:-webkit-flex;display:flex}.carousel .slider-wrapper.axis-vertical .slider{-webkit-flex-direction:column;flex-direction:column}.carousel .slider{margin:0;padding:0;position:relative;list-style:none;width:100%}.carousel .slider.animated{-webkit-transition:all .35s ease-in-out;-moz-transition:all .35s ease-in-out;-ms-transition:all .35s ease-in-out;-o-transition:all .35s ease-in-out;transition:all .35s ease-in-out}.carousel .slide{min-width:100%;margin:0;position:relative;text-align:center;background:#FFF}.carousel .slide img{width:100%;vertical-align:top;border:0}.carousel .slide iframe{display:inline-block;width:calc(100% - 80px);margin:0 40px 40px;border:0}.carousel .slide .legend{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;-ms-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out;position:absolute;bottom:40px;left:50%;margin-left:-45%;width:90%;border-radius:10px;background:#000;color:#fff;padding:10px;font-size:12px;text-align:center;opacity:0.25;-webkit-transition:opacity .35s ease-in-out;-moz-transition:opacity .35s ease-in-out;-ms-transition:opacity .35s ease-in-out;-o-transition:opacity .35s ease-in-out;transition:opacity .35s ease-in-out}.carousel .control-dots{position:absolute;bottom:0;margin:1px 0;padding:0;text-align:center;width:100%}@media (min-width: 960px){.carousel .control-dots{bottom:0}}.carousel .control-dots .dot{-webkit-transition:opacity .25s ease-in;-moz-transition:opacity .25s ease-in;-ms-transition:opacity .25s ease-in;-o-transition:opacity .25s ease-in;transition:opacity .25s ease-in;opacity:.3;filter:alpha(opacity=30);box-shadow:1px 1px 2px rgba(0,0,0,0.9);background:#000;border-radius:50%;width:8px;height:8px;cursor:pointer;display:inline-block;margin:0 8px}.carousel .control-dots .dot.selected,.carousel .control-dots .dot:hover{opacity:1;filter:alpha(opacity=100)}.carousel .carousel-status{position:absolute;top:0;right:0;padding:5px;font-size:10px;text-shadow:1px 1px 1px rgba(0,0,0,0.9);color:#666}.carousel:hover .slide .legend{opacity:1}');
loadCSSFromString('.hide-ta{display:none !important;}.react-chat-container {margin:0px auto;}.react-chat-viewerBox{min-height:200px !important} .meeting-invite{padding:5px;position:absolute;top:5px;right:20px}');
loadCSSFromURLAsync('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css');

const GlobalConfigKeys = {
    VIEW_ID: 'viewId',
    SCHEDULE_TABLE_ID: 'scheduleTableId',
    SCHEDULE_TITLE_FIELD_ID: 'titleFieldId',
    SCHEDULE_START_FIELD_ID: 'scheduleStartFieldId',
    SCHEDULE_END_FIELD_ID: 'scheduleEndFieldId',
    MEETING_FIELD_ID: 'meetingFieldId',
    NOTES_FIELD_ID: 'notesFieldId',
    VIDEO_FIELD_ID: 'videoFieldId',
    HOW_TO_ID: 'howToField',
    ENABLE_CHAT_ID: 'enableChatId',
    CHAT_TABLE_ID: 'chatTableId',
    CHAT_REF_FIELD_ID: 'chatRefFieldId',
    CHAT_REF_PARENT_FIELD_ID: 'chatRefParentFieldId',
    CHAT_DATE_FIELD_ID: 'chatDateFieldId',
    CHAT_USER_ID_FIELD_ID: 'chatUserIdFieldId',
    CHAT_USER_FIELD_ID: 'chatUserFieldId',
    CHAT_USER_AVATAR_FIELD_ID: 'chatUserAvatarFieldId',
    CHAT_MESSAGE_FIELD_ID: 'chatMessageFieldId',
};
var timerId = 0;
const colorsArr = [colors.BLUE_BRIGHT, colors.BLUE_DARK_1, colors.BLUE_LIGHT_1, colors.BLUE_LIGHT_2, colors.CYAN, colors.CYAN_BRIGHT, colors.CYAN_DARK_1, colors.CYAN_LIGHT_1, colors.CYAN_LIGHT_2, colors.GRAY, colors.GRAY_BRIGHT, colors.GRAY_DARK_1, colors.GRAY_LIGHT_1, colors.GRAY_LIGHT_2, colors.GREEN, colors.GREEN_BRIGHT, colors.GREEN_DARK_1, colors.GREEN_LIGHT_1, colors.GREEN_LIGHT_2, colors.ORANGE, colors.ORANGE_BRIGHT, colors.ORANGE_DARK_1, colors.ORANGE_LIGHT_1, colors.ORANGE_LIGHT_2, colors.PINK, colors.PINK_BRIGHT, colors.PINK_DARK_1, colors.PINK_LIGHT_1, colors.PINK_LIGHT_2, colors.PURPLE, colors.PURPLE_BRIGHT, colors.PURPLE_DARK_1, colors.PURPLE_LIGHT_1, colors.PURPLE_LIGHT_2, colors.RED, colors.RED_BRIGHT, colors.RED_DARK_1, colors.RED_LIGHT_1, colors.RED_LIGHT_2, colors.TEAL, colors.TEAL_BRIGHT, colors.TEAL_DARK_1, colors.TEAL_LIGHT_1, colors.TEAL_LIGHT_2, colors.YELLOW, colors.YELLOW_BRIGHT, colors.YELLOW_DARK_1, colors.YELLOW_LIGHT_1, colors.YELLOW_LIGHT_2];
function OnlineSchedulerBlock() {

    const mainRef = useRef(null);


    const viewPort = useViewport();
    const windowWidth = viewPort.size.width;
    const windowHeight = viewPort.size.height;

    console.log(windowHeight + " " + windowWidth);
    var frameHeight = 300;
    var clockHeight = 200;
    var clockPadding = 0;
    if (windowWidth >= 992) {
        //md/lg
        frameHeight = (windowHeight - 240) / 2;
        if (frameHeight < 200)
            frameHeight = 200;

        clockHeight = 120;
        clockPadding = 50;
        if (windowWidth > 1300) {
            clockHeight = 200;
            clockPadding = 20;
        }

    }
    var frameHeightPx = '' + frameHeight + "px";


    const currentUserSession = useSession();

    const currentUser = currentUserSession.currentUser.id;
    const currentUserName = currentUserSession.currentUser.name;
    const currentUserAvatar = currentUserSession.currentUser.profilePicUrl;
    // console.log(currentUserSession);


    sessionStorage.setItem("currentUser", currentUser);
    const VIEWPORT_MIN_WIDTH = 400;
    const VIEWPORT_MIN_HEIGHT = 200;
    const base = useBase();
    const globalConfig = useGlobalConfig();
    const scheduleTableId = globalConfig.get(GlobalConfigKeys.SCHEDULE_TABLE_ID);
    const scheduleStartFieldId = globalConfig.get(GlobalConfigKeys.SCHEDULE_START_FIELD_ID);
    const scheduleEndFieldId = globalConfig.get(GlobalConfigKeys.SCHEDULE_END_FIELD_ID);
    const meetingFieldId = globalConfig.get(GlobalConfigKeys.MEETING_FIELD_ID);
    const videoFieldId = globalConfig.get(GlobalConfigKeys.VIDEO_FIELD_ID);
    const notesFieldId = globalConfig.get(GlobalConfigKeys.NOTES_FIELD_ID);
    const titleFieldId = globalConfig.get(GlobalConfigKeys.SCHEDULE_TITLE_FIELD_ID);

    //Forum

    const enableChat = globalConfig.get(GlobalConfigKeys.ENABLE_CHAT_ID);
    const chatTableId = globalConfig.get(GlobalConfigKeys.CHAT_TABLE_ID);
    const chatDateFieldId = globalConfig.get(GlobalConfigKeys.CHAT_DATE_FIELD_ID);
    const chatMessageFieldId = globalConfig.get(GlobalConfigKeys.CHAT_MESSAGE_FIELD_ID);
    const chatRefFieldId = globalConfig.get(GlobalConfigKeys.CHAT_REF_FIELD_ID);
    const chatRefParentFieldId = globalConfig.get(GlobalConfigKeys.CHAT_REF_PARENT_FIELD_ID);
    const chatUserFieldId = globalConfig.get(GlobalConfigKeys.CHAT_USER_FIELD_ID);
    const chatUserIdFieldId = globalConfig.get(GlobalConfigKeys.CHAT_USER_ID_FIELD_ID);
    const chatUserAvatarFieldId = globalConfig.get(GlobalConfigKeys.CHAT_USER_AVATAR_FIELD_ID);

    const isFirstTime = globalConfig.get(GlobalConfigKeys.HOW_TO_ID) ? globalConfig.get(GlobalConfigKeys.HOW_TO_ID) !== "1" : true;

    //console.log(isFirstTime);

    var initialSetupDone = scheduleTableId && scheduleStartFieldId && scheduleEndFieldId && titleFieldId ? true : false;

    const scheduleTable = base.getTableByIdIfExists(scheduleTableId);
    const scheduleStartField = initialSetupDone ?
        scheduleTable.getFieldByIdIfExists(scheduleStartFieldId) : null;
    const scheduleEndField = initialSetupDone ?
        scheduleTable.getFieldByIdIfExists(scheduleEndFieldId) : null;
    const titleField = initialSetupDone ?
        scheduleTable.getFieldByIdIfExists(titleFieldId) : null;
    const meetingField = initialSetupDone ?
        scheduleTable.getFieldByIdIfExists(meetingFieldId) : null;
    const videoField = initialSetupDone ?
        scheduleTable.getFieldByIdIfExists(videoFieldId) : null;
    const notesField = initialSetupDone ?
        scheduleTable.getFieldByIdIfExists(notesFieldId) : null;




    var hasSettingPermission = globalConfig.checkPermissionsForSet();

    if (initialSetupDone) {
        //check if table and fields exist
        initialSetupDone = scheduleTable != null &&
            scheduleStartField != null && scheduleEndFieldId != null && titleFieldId != null;
    }

    if (enableChat === "Yes") {
        // If yes, other fields should also be configured
        if (initialSetupDone) {
            initialSetupDone = chatTableId && chatRefFieldId && chatDateFieldId && chatMessageFieldId && chatUserFieldId && chatUserIdFieldId && chatUserAvatarFieldId ? true : false;
        }

    }
    //Chat
    const chatTable = chatTableId ? base.getTableByIdIfExists(chatTableId) : null;
    const chatDateField = initialSetupDone && chatDateFieldId && chatTable ?
        chatTable.getFieldByIdIfExists(chatDateFieldId) : null;
    const chatMessageField = initialSetupDone && chatMessageFieldId && chatTable ?
        chatTable.getFieldByIdIfExists(chatMessageFieldId) : null;
    const chatRefField = initialSetupDone && chatRefFieldId && chatTable ?
        chatTable.getFieldByIdIfExists(chatRefFieldId) : null;
    const chatRefParentField = initialSetupDone && chatRefParentFieldId && chatTable ?
        scheduleTable.getFieldByIdIfExists(chatRefParentFieldId) : null;
    const chatUserField = initialSetupDone && chatUserFieldId && chatTable ?
        chatTable.getFieldByIdIfExists(chatUserFieldId) : null;
    const chatUserIdField = initialSetupDone && chatUserIdFieldId && chatTable ?
        chatTable.getFieldByIdIfExists(chatUserIdFieldId) : null;
    const chatUserAvatarField = initialSetupDone && chatUserAvatarFieldId && chatTable ?
        chatTable.getFieldByIdIfExists(chatUserAvatarFieldId) : null;
    if (enableChat === "Yes") {

        if (initialSetupDone) {
            // check if tables and fields exist
            initialSetupDone = chatTable != null && chatDateField != null && chatMessageField != null && chatRefField != null &&
                chatUserAvatarField != null && chatUserField != null && chatUserIdField != null && chatRefParentField != null;
        }
    }
    if (scheduleTable != null) {
        hasSettingPermission = hasSettingPermission && scheduleTable.hasPermissionToCreateRecord();
    }

    // console.log(chatDateField);
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);

    const [reRender, setReRender] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);

    const reRenderNotification = () => {
        setShow(false);
        setOpenNotification(true);
    };

    const reRenderData = () => {
        setShow(false);
        setReRender(!reRender);
    };



    if (timerId != 0)
        clearTimeout(timerId);
    timerId = setTimeout(function (e) {
        // render every minute to check for new schedule
        setReRender(!reRender);
    }, 60 * 1000);

    const [isDialogOpen, setIsDialogOpen] = useState(isFirstTime);


    // Use settings menu to hide away table pickers
    const [isShowingSettings, setIsShowingSettings] = useState(!initialSetupDone);
    useSettingsButton(function () {
        initialSetupDone && setIsShowingSettings(!isShowingSettings);
    });


    // The view ID is stored in globalConfig using ViewPickerSynced.
    const viewId = globalConfig.get(GlobalConfigKeys.VIEW_ID);
    const scheduleView = initialSetupDone ? scheduleTable.getViewByIdIfExists(viewId) : null;

    const schedule = useRecords(scheduleView ? scheduleView.selectRecords() :
        (scheduleTable ? scheduleTable.selectRecords() : null));

    const chatMessages = useRecords(chatTable ? chatTable.selectRecords() : null);

    const disableChatInput = chatTable ? !chatTable.hasPermissionToCreateRecord() : true;
    if (isShowingSettings) {
        viewPort.enterFullscreenIfPossible();
        return (
            <ViewportConstraint minSize={{ width: VIEWPORT_MIN_WIDTH, height: VIEWPORT_MIN_HEIGHT }}>
                <div style={{ height: (windowHeight - 10) + 'px', overflowY: 'auto', width: '100%' }} ref={mainRef}>

                    <SettingsMenu
                        globalConfig={globalConfig}
                        base={base}
                        scheduleTable={scheduleTable}
                        chatTable={chatTable}
                        initialSetupDone={initialSetupDone}
                        hasWritePermission={hasSettingPermission}
                        openHelp={() => setIsDialogOpen(true)}
                        onDoneClick={() => {


                            globalConfig.setAsync(GlobalConfigKeys.HOW_TO_ID, "1");
                            setIsShowingSettings(false)

                        }
                        }
                    />
                </div>
                {isDialogOpen && (
                    <Dialog onClose={() => setIsDialogOpen(false)} width="80%">
                        <Dialog.CloseButton />
                        <Heading>Welcome to Online Scheduler</Heading>
                        <Text variant="paragraph">
                            {parse(`
                            You can configure this Block to see your Schedule Information Live. This Block can be used for scenarios like:
                            <ol><li><b>Online classes:</b> Where the tutor configures the AirTable with details of daily classes, like Meeting Invite, Notes, Videos, etc and Students can login and view their daily schedule</li>
                            <li><b>Meetings:</b> Where Meetings are congifured in the AirTable and each individual can get all the information on a single screen</li>
                            <li><b>Tasks:</b> Where Team Lead configures tasks in the AirTable  and the entire Team can get a view of all Tasks and can also join into a Web Meeting to discuss</li>
                            </ol>
                            <br>
                            <b>Features:</b>
                            <ul>
                            <li>Live Tracking of Current Schedule</li>
                            <li>Alerts on an upcoming Schedule Item</li>
                            <li>Live Data Feed Updates by Author</li>
                            <li>Discussion Forum</li>
                            <li>Intuitve Clock UI for Bird eye View of schedule</li>
                            <li>Directly connect to Online Meetings</li>
                            <li>View Notes/Videos shared by the Author</li>
                            </ul>
                            To configure, select an AirTable which Contains Scheduler Information. This table should mandatorily have below columns:
                            <ol><li><b>Start Date Time:</b> Schedule Start Date and Time</li>
                            <li><b>End Date Time:</b> Schedule End Date and Time</li>
                            <li><b>Title:</b> To show current Schedule - e.g. Class Name for online classes, Meeting Name, etc</li>
                            </ol>
                            <br>
                            Optionally, below fields can be configured:
                            <ol><li><b>Meeting URL:</b> A Meeting URL like MS Teams, Webex, Zoom, etc - Users can directly join the meeting from the Block. In case embed meeting is not allowed by host, there will be an option to open it in a new Window</li>
                            <li><b>Video URL:</b> A third party embedable Video URL like YouTube, Vimeo, etc</li>
                            <li><b>Notes:</b> A field to capture relevant data regarding current schedule, to be displayed on UI</li>
                            <li><b>View:</b> A View to filter Today's data. This is not mandatory, but will improve the performance of the block</li>
                            </ol>
                            <br/>
                            You can also enable Discussion Forum/Chat for your Scheduler. To do this, you will need to create a Table in AirTable to store the history with Fields as below. Once done, select Enable Forum to Yes and select the below fields:
                            <ol><li><b>Reference:</b> to Store Tag Data: For e.g. In Online classes scenario, can be either a single lecture or even an entire course</li>
                            <li><b>Parent Reference:</b>Field of Schedule Table which will be mapped to the Reference Field of the Forum Table</li>
                            <li><b>Time Stamp:</b> To Store Forum Message Time Stamp</li>
                            <li><b>User ID:</b> To Store Forum Message Creator User ID</li>
                            <li><b>User Name:</b> To Store Forum Message Creator User Name</li>
                            <li><b>User Avatar:</b> To Store Forum Message Creator User Avatar</li>
                            </ol>
                            `)}
                        </Text>
                        <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                    </Dialog>
                )}
            </ViewportConstraint>
        )
    } else {

        if (schedule == null) {
            return (
                <ViewportConstraint minSize={{ width: VIEWPORT_MIN_WIDTH, height: VIEWPORT_MIN_HEIGHT }}>



                    <Container fluid>
                        <NoDataHeader />
                    </Container>

                </ViewportConstraint>
            );
        }




        var todayStart = moment().utc().startOf('day');
        var todayEnd = moment().utc().endOf('day');
        var todaysData = schedule.filter(record => {
            var startDate = record.getCellValue(scheduleStartField);
            if (moment.utc(startDate).isSameOrAfter(todayStart) && moment.utc(startDate).isBefore(todayEnd))
                return record;
        });

        if (todaysData.length == 0) {
            return (
                <ViewportConstraint minSize={{ width: VIEWPORT_MIN_WIDTH, height: VIEWPORT_MIN_HEIGHT }}>



                    <Container fluid>
                        <NoDataHeader />
                    </Container>

                </ViewportConstraint>
            );

        }
        else {

            var index = 0;
            todaysData = todaysData.sort(function (a, b) {
                try {

                    var startDate = a.getCellValue(scheduleStartField);

                    var endDate = b.getCellValue(scheduleStartField);

                    var stA = moment.utc(startDate).local();
                    var stB = moment.utc(endDate).local();
                    return (stA.isAfter(stB)) ? 1 : ((stA.isBefore(stB)) ? -1 : 0);

                }
                catch (e) { }
            });

            var ongoing = 0;
            var lastSession = sessionStorage.getItem("Session_" + currentUser);
            var currentSession = '';

            var currentId = todaysData.filter(record => {
                var startDate = record.getCellValue(scheduleStartField);
                var endDate = record.getCellValue(scheduleEndField);
                if (moment.utc(startDate).isSameOrBefore(moment().utc()) && moment.utc(endDate).isAfter(moment().utc()))
                    return record;
            });

            if (currentId.length > 0) {
                // an ongoing session
                currentSession = currentId[0].id;
                var ongoing = 1;
            }
            else {
                // check upcoming
                var currentId = todaysData.filter(record => {
                    var startDate = record.getCellValue(scheduleStartField);
                    if (moment.utc(startDate).isSameOrAfter(moment().utc()))
                        return record;
                });
                if (currentId.length > 0) {
                    // an upcoming session
                    currentSession = currentId[0].id;
                    var ongoing = 2;
                }
            }

            var timeInfo = '';
            var scheduleInfo = '';
            if (typeof lastSession !== 'undefined') {

                if (lastSession !== '') {

                    if (currentSession !== lastSession) {

                        var scheduleSelected = false;

                        var shouldForce = sessionStorage.getItem("Session_ForceLoad_" + currentUser);
                        if (shouldForce === '1') {
                            sessionStorage.setItem("Session_ForceLoad_" + currentUser, "0");
                            setReRender(false);
                            var selectedRecord = todaysData.filter((record, i) => {
                                if (record.id === lastSession) {
                                    index = i;
                                    return record;
                                }
                            });

                            if (selectedRecord.length > 0) {
                                scheduleSelected = true;
                                currentSession = lastSession;
                            }

                        }

                        if (!scheduleSelected) {
                            var newRecord = todaysData.filter((record, i) => {
                                if (record.id === currentSession) {
                                    index = i;
                                    return record;
                                }
                            });

                            if (newRecord.length > 0) {
                                timeInfo = moment().fromNow();

                                var newTitle = newRecord[0].getCellValue(titleField);
                                if (typeof newTitle === 'object') {
                                    if (typeof newTitle.name !== 'undefined')
                                        newTitle = newTitle.name;

                                    if (typeof newTitle.length !== 'undefined') {
                                        if (newTitle.length > 0) {
                                            if (typeof newTitle[0].name !== 'undefined')
                                                newTitle = newTitle[0].name;

                                        }
                                    }
                                }
                                else if (typeof newTitle === 'string') {

                                }
                                else {
                                    newTitle = '';
                                }
                                scheduleInfo = "A New Schedule has started: " + newTitle;

                                var isNotified = sessionStorage.getItem("SessionTimer_" + currentUser + "_" + newRecord[0].id);
                                if (typeof isNotified !== 'undefined')
                                    if (isNotified !== '1')
                                        isNotified = '0';
                                if (isNotified === '0') {
                                    sessionStorage.setItem("SessionTimerNotify_" + currentUser, newRecord[0].id);
                                    setTimeout(function () {
                                        setShow(true);
                                    }, 500);
                                }
                            }
                            // check if last session is in today data
                            var lastId = todaysData.filter(record => {
                                if (record.id == lastSession)
                                    return record;
                            });
                            if (lastId.length > 0) {
                                currentSession = lastSession;
                                sessionStorage.setItem("Session_" + currentUser, currentSession);
                            }
                        }
                    }
                    else {

                        // do nothing!
                        // check if last session is in today data
                        var lastId = todaysData.filter(record => {
                            if (record.id == lastSession)
                                return record;
                        });
                        if (lastId.length > 0) {
                            currentSession = lastSession;
                            sessionStorage.setItem("Session_" + currentUser, currentSession);
                        }
                    }
                }
                else {
                    // new user
                    sessionStorage.setItem("Session_" + currentUser, currentSession);
                }
            }
            else {
                // new user
                sessionStorage.setItem("Session_" + currentUser, currentSession);
            }

            if (currentSession === '') {
                if (todaysData.length > 0) {
                    currentSession = todaysData[0].id;
                    sessionStorage.setItem("Session_" + currentUser, currentSession);
                }
            }


            var currentRecord = todaysData.filter((record, i) => {
                if (record.id === currentSession) {
                    index = i;
                    return record;
                }
            });

            for (var i = 0; i < todaysData.length; i++) {
                todaysData[i].color = getColor(3 * i);
            }
            var meetingCard = null;
            var titleData = '';

            var messages = [];

            if (currentRecord.length > 0) {
                titleData = currentRecord[0].getCellValue(titleField);
                if (typeof titleData === 'object') {
                    if (typeof titleData.name !== 'undefined')
                        titleData = titleData.name;

                    if (typeof titleData.length !== 'undefined') {
                        if (titleData.length > 0) {
                            if (typeof titleData[0].name !== 'undefined')
                                titleData = titleData[0].name;

                        }
                    }
                }
                else if (typeof titleData === 'string') {

                }
                else {
                    titleData = '';
                }
                var currentColor = getColor(3 * index);
                currentRecord[0].color = currentColor;
                meetingCard = <MeetingDisplay record={currentRecord[0]} meetingField={meetingField} height={frameHeightPx} />;

                if (enableChat === 'Yes') {
                    var refParent = '';

                    if (chatRefParentField)
                        refParent = currentRecord[0].getCellValue(chatRefParentField);

                    if (typeof refParent === 'object') {
                        if (typeof refParent.name !== 'undefined')
                            refParent = refParent.name;

                        if (typeof refParent.length !== 'undefined') {
                            if (refParent.length > 0) {
                                if (typeof refParent[0].name !== 'undefined')
                                    refParent = refParent[0].name;

                            }
                        }
                    }
                    else if (typeof titleData === 'string') {

                    }
                    else {
                        titleData = '';
                    }

                    messages = chatMessages.filter(record => {
                        var refData = record.getCellValue(chatRefFieldId);
                        return (refParent === refData);
                    }).map(record => {
                        var dt = moment.utc(record.getCellValue(chatDateFieldId));
                        return {
                            author: {
                                username: record.getCellValue(chatUserField),
                                id: record.getCellValue(chatUserIdField),
                                avatarUrl: record.getCellValue(chatUserAvatarField),
                            },
                            text: record.getCellValue(chatMessageField),
                            type: 'text',
                            timestamp: dt.unix() * 1000
                        };

                    });
                    //console.log(messages);
                }
            }
            else
                meetingCard = <NoDataHeader />;
            var Cards = <StudyCard todaysData={todaysData} videoField={videoField} index={index} reRenderData={reRenderData} height={frameHeight} />;

            var notesCard = <SupportDisplay record={currentRecord[0]} videoField={videoField} notesField={notesField} height={frameHeight} heightPx={frameHeightPx} />;

            var meetingArray = todaysData.map((record, inx) => {

                var startDate = record.getCellValue(scheduleStartField);
                var endDate = record.getCellValue(scheduleEndField);

                var st = moment.utc(startDate).local().format("HH:mm");
                var et = moment.utc(endDate).local().format("HH:mm");
                return {
                    startTime: st, endTime: et,
                    startColor: getColor(3 * inx), endColor: getColor((3 * inx))
                };
            });


            const handleOnSendMessage = (message) => {
                var m = {};
                m[chatDateField.name] = moment().utc().toJSON();
                m[chatMessageField.name] = message;
                m[chatUserField.name] = currentUserName;
                m[chatUserIdField.name] = currentUser;
                m[chatUserAvatarField.name] = currentUserAvatar;
                m[chatRefField.name] = refParent;
                // console.log(m);
                chatTable.createRecordAsync(m).then(function () {

                });
            };


            return (
                <ViewportConstraint minSize={{ width: VIEWPORT_MIN_WIDTH, height: VIEWPORT_MIN_HEIGHT }}>
                    <div style={{ height: (windowHeight - 10) + 'px', overflowY: 'auto', width: '100%' }}  ref={mainRef}>


                        <Container fluid>
                            <Row>
                                <Col lg={8} md={8} xs={12} sm={12}>
                                    <Heading size="small" textAlign="left" style={{ paddingTop: "2px", paddingLeft: "10px", borderLeft: "5px solid " + currentColor }}>
                                        {titleData}
                                    </Heading>
                                </Col>
                                <Col lg={4} md={4} xs={12} sm={12}><Box style={{ paddingLeft: "15px" }} >
                                    <span style={{ position: "relative", top: "-5px" }}>Welcome </span><div style={{ paddingTop: '5px', display: 'inline-block' }}><CollaboratorToken collaborator={currentUserSession.currentUser} /></div>
                                </Box>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={8} md={12} xs={12} sm={12}>
                                    {meetingCard}
                                    <Heading size="default" textAlign="center" style={{ paddingTop: "10px" }}>
                                        Schedule for the Day:
                                </Heading>
                                    <Row>
                                        <Col lg={3} md={12} xs={12} sm={12} style={{ paddingTop: clockPadding }}>
                                            <ScheduleClock size={clockHeight} timeFormat="24hour" hourFormat="standard" meetings={meetingArray} />
                                        </Col>
                                        <Col lg={9} md={12} xs={12} sm={12}>
                                            {Cards}
                                        </Col>
                                    </Row>

                                </Col>
                                <Col lg={4} md={12} xs={12} sm={12}>
                                    {notesCard}

                                    {enableChat === "Yes" &&
                                        <div style={{ width: "100%" }}>
                                            <Heading size="default" textAlign="center" style={{ paddingTop: "10px" }}>
                                                Discussion Forum
                                </Heading>
                                            <Box
                                                border="thick"
                                                backgroundColor="white"
                                                padding={0}
                                                overflow="hidden"
                                            >

                                                <ChatBox
                                                    onSendMessage={handleOnSendMessage}
                                                    userId={currentUser}
                                                    messages={messages}
                                                    width={'100%'}
                                                    height={frameHeightPx}
                                                    disableInput={disableChatInput}
                                                    timestampFormat={'DD-MMM-YYYY HH:mm'}
                                                />

                                            </Box>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div
                        aria-live="polite"
                        aria-atomic="true"
                        style={{
                            position: 'absolute',
                            top: "5px",
                            right: "10px",
                            minHeight: '200px',
                            minWidth: "345px",
                            zIndex: 1000
                        }}
                    >
                        <Toast onClose={() => {
                            sessionStorage.setItem("SessionTimer_" + currentUser + "_" + sessionStorage.getItem("SessionTimerNotify_" + currentUser), '1')
                            setShow(false);
                        }} show={show}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                height: "100%",
                                minWidth: "345px"
                            }}
                        >
                            <Toast.Header>
                                <Icon name="info" size={20} />
                                <strong className="mr-auto">New Schedule Alert</strong>

                            </Toast.Header>
                            <Toast.Body>{scheduleInfo}
                                <br />
                                <br />
                                <Button
                                    onClick={() => {
                                        sessionStorage.setItem("Session_" + currentUser, '');
                                        sessionStorage.setItem("SessionTimer_" + currentUser + "_" + sessionStorage.getItem("SessionTimerNotify_" + currentUser), '1')

                                        reRenderNotification();
                                    }
                                    }
                                    variant="danger"
                                    icon="calendar"
                                >
                                    Open Schedule
                                    </Button>
                            </Toast.Body>
                        </Toast>
                    </div>
                </ViewportConstraint>
            );
        }
    }
}

function getColor(inc) {
    var inx = inc % colorsArr.length;


    return colorUtils.getHexForColor(colorsArr[inx]);
}

function MeetingDisplay({ record, meetingField, height }) {
    var meetingURL = //'https://success.zoom.us/wc/join/3268266921';//
        record.getCellValue(meetingField);

    const title = (<span className='meeting-invite'><a href={meetingURL} target="_blank" title="Open In New Window"><Icon name="expand" size={20} /></a></span>)

    return (<Box style={{ borderLeft: "5px solid " + record.color }}>
        {(record.getCellValue(meetingField) != '') && record.getCellValue(meetingField) != null &&
            <Box
                border="thick"
                backgroundColor="white"
                padding={1}
                overflow="hidden"
            >            <Tabs id="tabsVideo">
                    <Tab eventKey="meeting" title="Meeting Details">
                        <Iframe width="100%" height={height} src={meetingURL}
                            frameBorder="0" onload="javascript:alert('Error');"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen allowFullScreen />
                    </Tab>
                </Tabs>
                {title}
            </Box>
        }
    </Box>
    );
}

function SupportDisplay({ record, videoField, notesField, height, heightPx }) {
    var videoURL = record.getCellValue(videoField)

    return (<Box
        border="thick"
        backgroundColor="white"
        padding={0}
        overflow="hidden"
    ><Tabs id="tabsSupport">
            {notesField &&
                <Tab eventKey="notes" title="Notes">
                    <Box height={height} padding={2} overflow="auto">{record.getCellValue(notesField)}</Box>
                </Tab>
            }
            {videoField && record.getCellValue(videoField) != '' && record.getCellValue(videoField) != null &&
                <Tab eventKey="video" title="Video">
                    <Iframe width="100%" height={heightPx} src={videoURL}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen allowFullScreen />
                </Tab>
            }
        </Tabs>
    </Box>
    );
}

class StudyCard extends React.Component {
    constructor(props) {
        super(props);

        this.todaysData = this.props.todaysData;
        this.videoField = this.props.videoField;
        this.index = this.props.index;
        this.reRenderData = this.props.reRenderData;
        this.height = (this.props.height - 50) + "px";
        this.state = {
            index: this.props.index,
            height: this.props.height
        };
    }

    componentDidUpdate(prevProps) {

        if (JSON.stringify(prevProps.index) !== JSON.stringify(this.props.index) || prevProps.height !== this.props.height) {
            this.index = this.props.index;
            this.height = this.props.height;

            this.setState({
                index: this.props.index,
                height: this.props.height
            });
        }
    }

    handleClick(e) {
        var cUser = sessionStorage.getItem("currentUser");
        var recId = e.currentTarget.parentNode.getAttribute("data-record");
        var currentSession = sessionStorage.getItem("Session_" + cUser);
        if (currentSession !== recId) {
            sessionStorage.setItem("Session_" + cUser, recId);
            sessionStorage.setItem("Session_ForceLoad_" + cUser, "1");
            this.reRenderData();
        }
    }
    render() {
        var dr = this.todaysData.map(record => {
            var videoURL = record.getCellValue(this.videoField)

            return (<Box style={{ padding: '20px 50px 20px 50px', width: '100%', minHeight: this.height }}
                alignSelf="center" justifySelf="center" key={record.id} >
                <RecordCard record={record} alignSelf="center" justifySelf="center" flexShrink="revert"
                    style={{ marginBottom: '5px', borderLeft: "5px solid " + record.color }} />
                <span {...{ 'data-record': record.id }}>
                    <Button
                        onClick={this.handleClick.bind(this)}
                        variant="danger"
                        icon="calendar"
                    >
                        Load Schedule
                                        </Button>
                </span>
            </Box>
            )
        });
        return (<Carousel selectedItem={this.index}>
            {dr}
        </Carousel>);
    }

}

function NoDataHeader() {
    return (
        <Row><Col>
            <Box padding={4}>
                <Heading size="large" textColor="light">
                    No Scheduled Information available for today
                </Heading>
            </Box>
        </Col></Row>);

};

function SettingsMenu(props) {
    const resetScheduleFieldKeys = () => {
        props.globalConfig.setAsync(GlobalConfigKeys.SCHEDULE_START_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.SCHEDULE_END_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.VIDEO_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.MEETING_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.NOTES_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.SCHEDULE_TITLE_FIELD_ID, '');


    };

    const resetScheduleTableKey = () => {
        //props.globalConfig.setAsync(GlobalConfigKeys.SCHEDULE_TABLE_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.VIEW_ID, '');
    };



    const resetTableRelatedGlobalConfigKeys = () => {
        resetScheduleTableKey();
        resetScheduleFieldKeys();

    }


    const resetChatFieldKeys = () => {
        props.globalConfig.setAsync(GlobalConfigKeys.CHAT_DATE_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.CHAT_MESSAGE_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.CHAT_REF_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.CHAT_REF_PARENT_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.CHAT_USER_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.CHAT_USER_ID_FIELD_ID, '');
        props.globalConfig.setAsync(GlobalConfigKeys.CHAT_USER_AVATAR_FIELD_ID, '');


    };

    const options = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" }
    ];

    return (
        <div style={{ width: '100%' }}>
            <Heading margin={2}>
                Online Scheduler Configuration <Button
                    onClick={() => props.openHelp()}
                    size="small"
                    icon="help"
                    aria-label="Help"
                />
            </Heading>
            <Box marginX={2}>
                <Container fluid>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <FormField label="Select Table which contains Scheduler Information:">
                                <TablePickerSynced
                                    shouldAllowPickingNone={true}
                                    globalConfigKey={GlobalConfigKeys.SCHEDULE_TABLE_ID}
                                    onChange={() => resetTableRelatedGlobalConfigKeys()}
                                    size="large"
                                    maxWidth="350px"
                                />
                            </FormField>
                        </Col>
                    </Row>
                    {props.scheduleTable &&
                        <div style={{ width: '100%' }}>
                            <Row>        <Col lg={12} md={12} sm={12} xs={12}>
                                <Heading size="xsmall" variant="caps">{props.scheduleTable.name} Fields:</Heading>

                            </Col>
                            </Row>
                            <Row>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                    <FormField label="Title field:" marginRight={1}>
                                        <FieldPickerSynced
                                            size="small"
                                            maxWidth="350px"
                                            table={props.scheduleTable}
                                            globalConfigKey={GlobalConfigKeys.SCHEDULE_TITLE_FIELD_ID}
                                            allowedTypes={[
                                                FieldType.SINGLE_LINE_TEXT,
                                                FieldType.MULTIPLE_RECORD_LINKS
                                            ]}
                                        />
                                    </FormField>
                                </Col>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                    <FormField label="Start date/time field:" marginRight={1}>
                                        <FieldPickerSynced
                                            size="small"
                                            maxWidth="350px"
                                            table={props.scheduleTable}
                                            globalConfigKey={GlobalConfigKeys.SCHEDULE_START_FIELD_ID}
                                            allowedTypes={[
                                                FieldType.DATE_TIME
                                            ]}
                                        />
                                    </FormField>
                                </Col>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                    <FormField label="End date/time field:">
                                        <FieldPickerSynced
                                            size="small"
                                            maxWidth="350px"
                                            table={props.scheduleTable}
                                            globalConfigKey={GlobalConfigKeys.SCHEDULE_END_FIELD_ID}
                                            allowedTypes={[
                                                FieldType.DATE_TIME
                                            ]}
                                        />
                                    </FormField>
                                </Col>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                    <FormField label="Online Meeting field:" marginRight={1}>
                                        <FieldPickerSynced
                                            size="small"
                                            maxWidth="350px"
                                            shouldAllowPickingNone={true}
                                            table={props.scheduleTable}
                                            globalConfigKey={GlobalConfigKeys.MEETING_FIELD_ID}
                                            allowedTypes={[
                                                FieldType.SINGLE_LINE_TEXT,
                                                FieldType.URL,
                                                FieldType.MULTILINE_TEXT
                                            ]}
                                        />
                                    </FormField>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                    <FormField label="Associated Video field:">
                                        <FieldPickerSynced
                                            size="small"
                                            maxWidth="350px"
                                            table={props.scheduleTable}
                                            shouldAllowPickingNone={true}
                                            globalConfigKey={GlobalConfigKeys.VIDEO_FIELD_ID}
                                            allowedTypes={[
                                                FieldType.SINGLE_LINE_TEXT,
                                                FieldType.URL,
                                                FieldType.MULTILINE_TEXT
                                            ]}
                                        />
                                    </FormField>
                                </Col>
                                <Col lg={3} md={3} sm={6} xs={12}>
                                    <FormField label="Notes field:">
                                        <FieldPickerSynced
                                            size="small"
                                            maxWidth="350px"
                                            table={props.scheduleTable}
                                            shouldAllowPickingNone={true}
                                            globalConfigKey={GlobalConfigKeys.NOTES_FIELD_ID}
                                            allowedTypes={[
                                                FieldType.SINGLE_LINE_TEXT,
                                                FieldType.MULTILINE_TEXT
                                            ]}
                                        />
                                    </FormField>
                                </Col>
                            </Row>
                            <Row>

                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <hr />
                                    <FormField label=""> <Text>View in {props.scheduleTable.name} Table to filter records (Preferably displaying daily records):
                            </Text>
                                        <ViewPickerSynced
                                            shouldAllowPickingNone={true}
                                            size="large"
                                            maxWidth="350px"
                                            table={props.scheduleTable}
                                            globalConfigKey={GlobalConfigKeys.VIEW_ID}
                                        ></ViewPickerSynced>
                                    </FormField>
                                </Col>
                            </Row>
                            <Row>

                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <hr />

                                    <FormField label="Enable Discussion Forum:">
                                        <SelectButtons
                                            value={props.globalConfig.get(GlobalConfigKeys.ENABLE_CHAT_ID)}
                                            onChange={newValue => {
                                                props.globalConfig.setAsync(GlobalConfigKeys.ENABLE_CHAT_ID, newValue);
                                                if (newValue == 'No') {
                                                    resetChatFieldKeys();
                                                }
                                            }}
                                            options={options}
                                            width="320px"
                                        />

                                    </FormField>
                                    {props.globalConfig.get(GlobalConfigKeys.ENABLE_CHAT_ID) == 'Yes' &&
                                        <FormField label="Select Table which should contain Forum History:">
                                            <TablePickerSynced
                                                shouldAllowPickingNone={true}
                                                globalConfigKey={GlobalConfigKeys.CHAT_TABLE_ID}
                                                onChange={() => resetChatFieldKeys()}
                                                size="large"
                                                maxWidth="350px"
                                            />
                                        </FormField>
                                    }
                                    {props.chatTable && props.globalConfig.get(GlobalConfigKeys.ENABLE_CHAT_ID) == 'Yes' &&
                                        <div style={{ width: '100%' }}>
                                            <Row>        <Col lg={12} md={12} sm={12} xs={12}>
                                                <Heading size="xsmall" variant="caps">{props.chatTable.name} Fields:</Heading>

                                            </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={6} md={6} sm={6} xs={12}>
                                                    <FormField label="Reference field (to Tag Data: For e.g. In Online classes scenario, can be either a single lecture or even an entire course):" marginRight={1}>
                                                        <FieldPickerSynced
                                                            size="small"
                                                            maxWidth="350px"
                                                            table={props.chatTable}
                                                            globalConfigKey={GlobalConfigKeys.CHAT_REF_FIELD_ID}
                                                            allowedTypes={[
                                                                FieldType.SINGLE_LINE_TEXT
                                                            ]}
                                                        />
                                                    </FormField>
                                                </Col>
                                                <Col lg={6} md={6} sm={6} xs={12}>
                                                    <FormField label="Parent Reference field (to Map Data to Current Schedule Reference Field will be mapped to this Field of the Schedule Table):" marginRight={1}>
                                                        <FieldPickerSynced
                                                            size="small"
                                                            maxWidth="350px"
                                                            table={props.scheduleTable}
                                                            globalConfigKey={GlobalConfigKeys.CHAT_REF_PARENT_FIELD_ID}
                                                            allowedTypes={[
                                                                FieldType.SINGLE_LINE_TEXT,
                                                                FieldType.MULTIPLE_RECORD_LINKS
                                                            ]}
                                                        />
                                                    </FormField>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={3} md={3} sm={6} xs={12}>
                                                    <FormField label="Forum TimeStamp field:" marginRight={1}>
                                                        <FieldPickerSynced
                                                            size="small"
                                                            maxWidth="350px"
                                                            table={props.chatTable}
                                                            globalConfigKey={GlobalConfigKeys.CHAT_DATE_FIELD_ID}
                                                            allowedTypes={[
                                                                FieldType.DATE_TIME
                                                            ]}
                                                        />
                                                    </FormField>
                                                </Col>
                                                <Col lg={3} md={3} sm={6} xs={12}>
                                                    <FormField label="Forum Message field:">
                                                        <FieldPickerSynced
                                                            size="small"
                                                            maxWidth="350px"
                                                            table={props.chatTable}
                                                            globalConfigKey={GlobalConfigKeys.CHAT_MESSAGE_FIELD_ID}
                                                            allowedTypes={[
                                                                FieldType.SINGLE_LINE_TEXT,
                                                                FieldType.MULTILINE_TEXT
                                                            ]}
                                                        />
                                                    </FormField>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col lg={3} md={3} sm={6} xs={12}>
                                                    <FormField label="User ID field:" marginRight={1}>
                                                        <FieldPickerSynced
                                                            size="small"
                                                            maxWidth="350px"
                                                            shouldAllowPickingNone={true}
                                                            table={props.chatTable}
                                                            globalConfigKey={GlobalConfigKeys.CHAT_USER_ID_FIELD_ID}
                                                            allowedTypes={[
                                                                FieldType.SINGLE_LINE_TEXT,
                                                                FieldType.MULTILINE_TEXT
                                                            ]}
                                                        />
                                                    </FormField>
                                                </Col>
                                                <Col lg={3} md={3} sm={6} xs={12}>
                                                    <FormField label="User Name field:" marginRight={1}>
                                                        <FieldPickerSynced
                                                            size="small"
                                                            maxWidth="350px"
                                                            shouldAllowPickingNone={true}
                                                            table={props.chatTable}
                                                            globalConfigKey={GlobalConfigKeys.CHAT_USER_FIELD_ID}
                                                            allowedTypes={[
                                                                FieldType.SINGLE_LINE_TEXT,
                                                                FieldType.MULTILINE_TEXT
                                                            ]}
                                                        />
                                                    </FormField>
                                                </Col>
                                                <Col lg={3} md={3} sm={6} xs={12}>
                                                    <FormField label="User Avatar field:">
                                                        <FieldPickerSynced
                                                            size="small"
                                                            maxWidth="350px"
                                                            table={props.chatTable}
                                                            shouldAllowPickingNone={true}
                                                            globalConfigKey={GlobalConfigKeys.CHAT_USER_AVATAR_FIELD_ID}
                                                            allowedTypes={[
                                                                FieldType.SINGLE_LINE_TEXT,
                                                                FieldType.URL,
                                                                FieldType.MULTILINE_TEXT
                                                            ]}
                                                        />
                                                    </FormField>
                                                </Col>

                                            </Row>
                                        </div>

                                    }
                                </Col>
                            </Row>
                        </div>}
                </Container>

            </Box>
            <Box display="flex" marginBottom={2}>
                <Button
                    variant="primary"
                    icon="check"
                    marginLeft={2}
                    disabled={!props.initialSetupDone || !props.hasWritePermission}
                    onClick={props.onDoneClick}
                    alignSelf="right"
                >
                    Done
                </Button>
            </Box>
        </div>
    );
}

initializeBlock(() => <OnlineSchedulerBlock />);
