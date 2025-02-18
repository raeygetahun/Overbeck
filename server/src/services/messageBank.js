const dearVol = 'Dear Volunteer,<br><br>'
const dearAdmin = 'Dear Admins,<br><br>'
const closing = 'Best regards,<br>Overbeck Museum'
const wish = '<br>Have a great day! 😊'

const emailMessages = {
    'New TimeSlot': `${dearAdmin}This is to notify you about a new timeslot application submitted by <strong>{name}</strong>.<br>
Please review the details and take appropriate action.<br><br>
Thank you.${wish}`,

    'New Volunteer': `${dearAdmin}Excited to inform you about a new volunteer registration.<br><br>
Name: <strong>{name}</strong><br><br>
Please extend a warm welcome to our new volunteer.<br><br>
Thank you.${wish}`,

    'TimeSlot Approved': `${dearVol}We're pleased to inform you that your timeslot application has been approved.<br>
Thank you for your interest in volunteering with us!<br><br>${closing}`,

    'TimeSlot Rejected': `${dearVol}We regret to inform you that your timeslot application has been rejected.<br>
Reason for rejection: <strong>{reason}</strong><br><br>We appreciate your interest in volunteering with us and encourage you to apply for other timeslots.<br><br>
If you have any questions or need further assistance, please don't hesitate to contact us.<br><br>
Thank you for your understanding.<br><br>${closing}`,


    'Account Approved': `${dearVol}We are delighted to inform you that your account has been approved!<br>\
You can now access all features and opportunities available for volunteers.<br>\
If you have any questions or need assistance, feel free to reach out to us.<br>\
<br>\
Thank you for joining us in making a positive impact!<br>\
<br>${closing}`,

    'Account Rejected': `${dearVol}We regret to inform you that your account registration has been rejected.<br>\
Unfortunately, your application does not meet our current requirements.<br>\
If you believe this decision is in error or have any questions, please don't hesitate to contact us.<br>\
<br>\
Thank you for your interest in volunteering with us. We appreciate your understanding.<br>\
<br>${closing}`,

    'New Admin': `Dear {name}<br><br>Welcome to the team!<br><br>
We're thrilled to announce that you've been added as an administrator for Overbeck Museum VOlunteers Managment App.<br><br>
Your contribution will play a vital role in managing and enhancing our volunteering program.<br><br>
Please familiarize yourself with your new responsibilities, and don't hesitate to reach out if you have any questions or need assistance.<br><br>
Thank you for joining us on this journey!<br>
${closing}`

}

// Export the function to retrieve a message by key
module.exports.getMessage = (key) => {
    return emailMessages[key];
};
