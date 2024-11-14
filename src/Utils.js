import gsap from "gsap";

class Utils {
  isMobile() {
    let viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) {
      return true;
    } else {
      return false;
    }
  }

  pageIntroAnim() {
    const pageContent = document.querySelector(".page-content");
    if (!pageContent) return;
    gsap.fromTo(
      pageContent,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }
    );
  }

  // Helper method to format dates
  formatDate(dateString) {
    if (dateString != "null" || !dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options); // Uses locale date formatting
    } else {
      return "";
    }
  }

  convertAccessLevelToText(accessLevel) {
    var accessLevelName = "";
    if (accessLevel == 1) {
      accessLevelName = "Client";
    } else if (accessLevel == 2) {
      accessLevelName = "Agent";
    }
    return accessLevelName;
  }
}

export default new Utils();
