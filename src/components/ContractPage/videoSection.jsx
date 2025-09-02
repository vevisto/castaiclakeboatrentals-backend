import React, { useEffect } from "react";

export default function WistiaVideo() {
  useEffect(() => {
    // Load Wistia scripts dynamically
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/player.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/jx3phzvgwj.js";
    script2.type = "module";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div>
      <style>
        {`
          wistia-player[media-id='jx3phzvgwj']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/jx3phzvgwj/swatch');
            display: block;
            filter: blur(5px);
            padding-top: 56.25%;
          }
        `}
      </style>

      {/* Wistia video player */}
      <wistia-player
        media-id="jx3phzvgwj"
        aspect="1.7777777777777777"
      ></wistia-player>
    </div>
  );
}
