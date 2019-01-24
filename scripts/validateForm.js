function validateForm () {
    console.log('ran')
    var lat = Number(document.forms["newBeach"]["lat"].value);
    var lon = Number(document.forms["newBeach"]["lon"].value);
      if (lat < -90 || lat > 90) {
        alert("Invalid latitude coordinate");
        return false;
      } else {
          if (lon < -180 || lat > 180) {
            alert("Invalid longitude coordinate");
            return false;
        }
      }
    }