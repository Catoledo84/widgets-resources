// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import ReactNativeFirebase from "react-native-firebase";

/**
 * Displays the specified notification straight away.
 *
 * Note: It is not possible to display a notification whilst the app is in the foreground on iOS 9.
 * @param {string} body - This field is required.
 * @param {string} title
 * @param {string} subtitle
 * @param {boolean} playSound
 * @param {Big} iosBadgeNumber
 * @param {string} actionName
 * @param {string} actionGuid
 * @returns {string}
 */
function DisplayNotification(
    body?: string,
    title?: string,
    subtitle?: string,
    playSound?: boolean,
    iosBadgeNumber?: BigJs.Big,
    actionName?: string,
    actionGuid?: string
): Promise<void> {
    // BEGIN USER CODE
    // Documentation https://rnfirebase.io/docs/v5.x.x/notifications/displaying-notifications

    const firebase: typeof ReactNativeFirebase = require("react-native-firebase");

    if (!body) {
        throw new TypeError("Input parameter 'Body' is required");
    }

    if (iosBadgeNumber && iosBadgeNumber.lte(0)) {
        throw new TypeError("Input parameter 'iOS badge number' should be greater than zero");
    }

    const channel = new firebase.notifications.Android.Channel(
        "mendix-local-notifications-jsactions",
        "Local notifications channel used by JS actions",
        firebase.notifications.Android.Importance.Default
    );
    firebase.notifications().android.createChannel(channel);

    const notification = new firebase.notifications.Notification()
        .setBody(body)
        .android.setChannelId("mendix-local-notifications-jsactions");

    if (title) {
        notification.setTitle(title);
    }

    if (subtitle) {
        notification.setSubtitle(subtitle);
    }

    if (playSound) {
        notification.setSound("default");
    }

    if (iosBadgeNumber) {
        notification.ios.setBadge(Number(iosBadgeNumber));
    }

    if (actionName || actionGuid) {
        notification.setData({
            actionName,
            guid: actionGuid
        });
    }

    return firebase.notifications().displayNotification(notification);

    // END USER CODE
}
