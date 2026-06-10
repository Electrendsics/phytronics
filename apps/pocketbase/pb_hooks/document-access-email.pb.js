// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
    // Only send email for successful access attempts
    if (e.record.get("status") !== "success") {
      e.next();
      return;
    }
  
    const documentName = e.record.get("documentName");
    const timestamp = e.record.get("timestamp");
    const ipAddress = e.record.get("ipAddress") || "Unknown";
    
    // Try to find visitor tracking info by IP address
    let visitorName = "Unknown Visitor";
    let visitorPosition = "Not specified";
    
    try {
      const visitor = $app.findFirstRecordByData("visitor_tracking", "ipAddress", ipAddress);
      if (visitor) {
        visitorName = visitor.get("name") || "Unknown Visitor";
        visitorPosition = visitor.get("position") || "Not specified";
      }
    } catch (err) {
      // Visitor not found, use defaults
    }
  
    const message = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: $app.settings().meta.senderName
      },
      to: [{ address: "phytronics@gmail.com" }],
      subject: "Document Access Alert - " + documentName,
      html: "<h2>Document Access Alert</h2>" +
            "<p><strong>Visitor Name:</strong> " + visitorName + "</p>" +
            "<p><strong>Position/Title:</strong> " + visitorPosition + "</p>" +
            "<p><strong>Document Accessed:</strong> " + documentName + "</p>" +
            "<p><strong>Access Time:</strong> " + timestamp + "</p>" +
            "<p><strong>IP Address:</strong> " + ipAddress + "</p>" +
            "<p><strong>Access Type:</strong> " + (e.record.get("accessType") || "Not specified") + "</p>"
    });
    
    $app.newMailClient().send(message);
    e.next();
  }, "download_logs");