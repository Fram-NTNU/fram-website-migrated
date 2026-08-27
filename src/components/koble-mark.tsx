// Koble-merket som inline-SVG med currentColor, så det tar tekstfargen
// (svart ved siden av «Koble», hvitt på mørk hero). Bakgrunnen fra original-
// SVG-en er fjernet så det er gjennomsiktig. Original ligger i
// public/assets/koble-symbol.svg.
export function KobleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110.88 140.249994"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="Koble"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="km_c9aa0617e5">
          <path d="M 10.703125 128.832031 L 10.539062 24.921875 L 10.515625 10.300781 L 29.910156 10.28125 L 29.929688 24.882812 L 20.242188 24.902344 L 29.929688 24.882812 L 30.09375 128.789062 Z M 10.703125 128.832031 " clipRule="nonzero" />
        </clipPath>
        <clipPath id="km_aa7f96e5ca">
          <path d="M 0.703125 118.832031 L 0.539062 14.921875 L 0.515625 0.300781 L 19.910156 0.28125 L 19.929688 14.882812 L 10.242188 14.902344 L 19.929688 14.882812 L 20.09375 118.789062 Z M 0.703125 118.832031 " clipRule="nonzero" />
        </clipPath>
        <clipPath id="km_3c6194a24a">
          <path d="M 86.191406 117.933594 L 50.019531 81.863281 L 63.714844 68.125 L 99.886719 104.195312 Z M 86.191406 117.933594 " clipRule="nonzero" />
        </clipPath>
        <clipPath id="km_0fb72da2fe">
          <path d="M 36.191406 49.933594 L 0.0195312 13.863281 L 13.714844 0.125 L 49.886719 36.195312 Z M 36.191406 49.933594 " clipRule="nonzero" />
        </clipPath>
        <clipPath id="km_3ed3a483cc">
          <path d="M 16.828125 79.375 L 16.828125 89.0625 L 16.808594 79.375 C 28.285156 79.355469 39.265625 74.789062 47.367188 66.667969 L 81.789062 32.140625 L 95.527344 45.835938 L 61.101562 80.339844 L 54.234375 73.492188 L 61.101562 80.339844 C 49.382812 92.105469 33.445312 98.726562 16.851562 98.765625 Z M 16.828125 79.375 " clipRule="nonzero" />
        </clipPath>
        <clipPath id="km_a78cbd2186">
          <path d="M 0.828125 47.375 L 0.828125 57.0625 L 0.808594 47.375 C 12.285156 47.355469 23.265625 42.789062 31.367188 34.667969 L 65.789062 0.140625 L 79.527344 13.835938 L 45.101562 48.339844 L 38.234375 41.492188 L 45.101562 48.339844 C 33.382812 60.105469 17.445312 66.726562 0.851562 66.765625 Z M 0.828125 47.375 " clipRule="nonzero" />
        </clipPath>
      </defs>
      <g clipPath="url(#km_c9aa0617e5)">
        <g transform="translate(10, 10)">
          <g clipPath="url(#km_aa7f96e5ca)">
            <rect x="-34.3936" width="159.6672" height="201.959991" y="-40.854999" />
          </g>
        </g>
      </g>
      <g clipPath="url(#km_3c6194a24a)">
        <g transform="translate(50, 68)">
          <g clipPath="url(#km_0fb72da2fe)">
            <rect x="-74.3936" width="159.6672" height="201.959991" y="-98.854999" />
          </g>
        </g>
      </g>
      <g clipPath="url(#km_3ed3a483cc)">
        <g transform="translate(16, 32)">
          <g clipPath="url(#km_a78cbd2186)">
            <rect x="-40.3936" width="159.6672" height="201.959991" y="-62.854999" />
          </g>
        </g>
      </g>
    </svg>
  );
}
