$(document).ready(function() {
  var headerTitleElement = $("#header h1");
  var entriesElement = $("#weekdone-entries");
  var formElement = $("#weekdone-form");
  var submitElement = $("#weekdone-submit");
  var entryContentElement = $("#weekdone-entry-content");
  var hostAddressElement = $("#weekdone-host-address");
  

  var appendWeekDoneEntries = function() {
    $.getJSON("/api/entries", function(entries) {
      entriesElement.empty();
      $.each(entries, function(key, val) {

      var d = new Date(val.timestamp);
      var date = d.getDate();
      var day = d.getDay();
      
      var weekOfMonth = Math.ceil((date - 1 - day) / 7);
      var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];

      var weekOrders = ["First", "Second", "Third", "Fourth"];

        if (key == "error") {
          $('#status').html("Backend server offline");
          entriesElement.append("<p>" + val + "</p>"); 
        } else {
          var row =`        <tr>
          <th scope="row"><p>${val.id.substring(5,10)}</p></th>
          <td><p>${val.message}</p></td>
          <td><p>${weekOrders[weekOfMonth]} Week of ${monthNames[d.getMonth()]}</p></td>
        </tr>`
          entriesElement.append(row);
        }
      });
    });
  }

  var handleSubmission = function(e) {
    e.preventDefault();
    var entryValue = entryContentElement.val();
    if (entryValue.length > 0) {

      console.log("UTC " + Date.UTC());
      console.log("Now " + Date.now());

      $.ajax({
        url: "/api/entries",
        method: "POST",
        data: {"message": entryValue, timestamp: Date()},
        success: appendWeekDoneEntries
      });
      entriesElement.append("<p>...</p>");
        
      entryContentElement.val("")
    }
    return false;
  }

  submitElement.click(handleSubmission);
  formElement.submit(handleSubmission);
  hostAddressElement.append(document.URL);

  // Poll every second.
  (function fetchWeekDone() {
      console.log("Getting list");
      $.getJSON("/api/entries").done(appendWeekDoneEntries).always(
        function() {
          setTimeout(fetchWeekDone, 1000);
        });
  })()
});
