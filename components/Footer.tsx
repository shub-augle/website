import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark px-4 lg:px-[72px] pt-16 pb-11">
      <div className="max-w-[1280px] mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[260px_1fr_1fr_1fr_1fr] lg:gap-12 mb-[52px]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            {/* Dark logo — CRITICAL: must include M567.428 (g-letter) and M842.778 (® mark) paths */}
            <svg width="120" height="34" viewBox="0 0 856 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M318.382 131.344H256.46C249.605 146.891 246.176 157.672 246.176 163.685C246.176 168.085 247.781 170.872 250.99 172.045C254.345 173.219 259.304 173.805 265.869 173.805V182.605H205.916V173.805C209.417 173.365 212.408 172.779 214.887 172.045C217.513 171.312 219.774 170.285 221.67 168.965C223.713 167.645 225.463 165.959 226.921 163.905C228.381 161.705 229.766 159.065 231.079 155.985L288.624 11.0003H304.816L357.11 139.484C360.173 146.965 362.727 152.832 364.768 157.085C366.956 161.338 369.218 164.639 371.551 166.985C374.032 169.185 376.803 170.725 379.866 171.605C383.076 172.485 387.16 173.145 392.119 173.585V182.605H309.411V173.585C316.412 173.293 321.445 172.559 324.508 171.385C327.571 170.212 329.103 167.865 329.103 164.345C329.103 162.292 328.594 159.652 327.571 156.425C326.551 153.198 325.165 149.238 323.414 144.545L318.382 131.344ZM261.492 118.144H313.568L288.405 51.4816H287.53L261.492 118.144Z" fill="#F7F6F2"/>
              <path d="M472.907 102.083C472.907 96.2164 472.762 91.5962 472.47 88.2227C472.179 84.7026 471.376 82.0625 470.063 80.3025C468.75 78.3958 466.781 77.1492 464.155 76.5624C461.677 75.8291 458.247 75.2423 453.871 74.8023V66.002H503.321V132.664C503.321 141.611 503.395 148.651 503.54 153.785C503.832 158.772 504.27 162.512 504.853 165.005C505.29 166.912 505.802 168.452 506.384 169.625C506.969 170.652 507.916 171.532 509.229 172.265C510.542 172.853 512.292 173.293 514.48 173.585C516.815 173.733 519.805 173.805 523.451 173.805V182.385L479.909 185.025L477.502 165.445H476.627C472.836 171.605 467.511 176.373 460.654 179.745C453.8 183.119 446.141 184.805 437.68 184.805C422.073 184.805 410.184 179.233 402.015 168.085C395.743 159.578 392.606 147.478 392.606 131.784V102.083C392.606 96.0698 392.461 91.3762 392.168 88.0027C391.878 84.4826 391.074 81.8425 389.762 80.0825C388.596 78.3224 386.772 77.1492 384.291 76.5624C381.813 75.8291 378.384 75.2423 374.008 74.8023V66.002H423.02V128.264C423.02 143.078 424.844 153.858 428.49 160.605C432.138 167.205 437.972 170.505 445.994 170.505C454.601 170.505 461.239 166.545 465.906 158.625C470.574 150.998 472.907 139.778 472.907 124.964V102.083Z" fill="#F7F6F2"/>
              {/* g-letter path — M567.428 — REQUIRED */}
              <path d="M567.428 158.845C571.366 159.138 574.795 159.432 577.711 159.725C580.775 160.018 583.619 160.385 586.245 160.825C589.017 161.118 591.715 161.485 594.341 161.925C597.113 162.218 600.029 162.585 603.093 163.025C614.471 164.639 623.37 168.965 629.787 176.005C636.351 182.899 639.633 191.48 639.633 201.746C639.633 214.214 634.529 223.674 624.317 230.127C614.106 236.581 599.082 239.807 579.243 239.807C561.01 239.807 546.933 237.095 537.014 231.667C527.241 226.387 522.354 218.834 522.354 209.006C522.354 201.38 524.323 195.586 528.262 191.626C532.2 187.813 537.161 185.905 543.14 185.905C546.933 185.905 550.58 186.639 554.081 188.106C557.728 189.72 560.792 191.993 563.27 194.926C559.479 195.66 556.342 197.346 553.862 199.986C551.528 202.774 550.361 206 550.361 209.666C550.361 215.534 552.915 220.007 558.019 223.087C563.27 226.315 570.928 227.927 580.993 227.927C602.874 227.927 613.814 220.96 613.814 207.026C613.814 202.04 612.137 197.714 608.782 194.046C605.573 190.526 600.905 188.399 594.778 187.666L556.487 182.385C540.296 180.185 532.2 172.925 532.2 160.605C532.2 154.592 534.097 149.678 537.889 145.865C541.827 142.051 547.371 139.411 554.518 137.944V137.064C551.164 135.744 548.101 133.911 545.328 131.564C542.703 129.217 540.369 126.504 538.327 123.424C536.286 120.344 534.68 117.044 533.513 113.524C532.492 109.857 531.981 106.117 531.981 102.303C531.981 96.8764 533.075 91.8162 535.263 87.1227C537.598 82.2826 540.733 78.1758 544.672 74.8023C548.757 71.429 553.498 68.7889 558.894 66.8821C564.438 64.8288 570.419 63.802 576.836 63.802C583.11 63.802 589.236 64.7554 595.216 66.6621C601.197 68.5689 606.303 71.209 610.532 74.5823C613.888 72.529 616.806 70.8422 619.284 69.5221C621.765 68.0555 624.026 66.9555 626.067 66.222C628.255 65.342 630.225 64.7554 631.975 64.462C633.725 64.022 635.476 63.802 637.226 63.802C642.77 63.802 647.22 65.0488 650.573 67.5421C654.074 70.0356 655.825 73.3357 655.825 77.4424C655.825 80.5225 654.878 83.0894 652.98 85.1426C651.084 87.0495 648.604 88.0027 645.541 88.0027C643.353 88.0027 641.602 87.5627 640.29 86.6827C638.977 85.656 637.664 84.556 636.351 83.3826C635.185 82.0625 633.944 80.9625 632.631 80.0825C631.319 79.0558 629.568 78.5424 627.38 78.5424C624.317 78.5424 621.401 80.5225 618.628 84.4826C620.088 86.9761 621.108 89.6896 621.691 92.6229C622.276 95.4097 622.566 98.7098 622.566 102.523C622.566 108.097 621.691 113.23 619.941 117.924C618.19 122.617 615.419 126.797 611.626 130.464C607.98 133.984 603.24 136.991 597.404 139.484C591.57 141.978 584.494 143.664 576.18 144.545C569.178 145.278 564.293 146.231 561.52 147.405C558.894 148.578 557.581 150.338 557.581 152.685C557.581 156.205 560.863 158.258 567.428 158.845ZM577.93 132.004C582.599 132.004 586.245 129.511 588.87 124.524C591.496 119.537 592.809 112.57 592.809 103.623C592.809 94.5297 591.496 87.5627 588.87 82.7226C586.245 77.7358 582.525 75.2423 577.711 75.2423C572.752 75.2423 568.814 77.7358 565.896 82.7226C562.98 87.7095 561.52 94.5297 561.52 103.183C561.52 111.983 562.98 119.024 565.896 124.304C568.959 129.437 572.971 132.004 577.93 132.004Z" fill="#F7F6F2"/>
              <path d="M696.38 146.525C696.38 152.392 696.599 157.085 697.037 160.605C697.475 164.125 698.35 166.839 699.663 168.745C700.975 170.652 702.873 171.973 705.351 172.705C707.832 173.293 711.187 173.659 715.416 173.805V182.605H646.493V173.805C650.578 173.659 653.861 173.219 656.339 172.485C658.965 171.605 660.934 170.285 662.247 168.525C663.707 166.619 664.654 164.052 665.091 160.825C665.676 157.452 665.967 153.198 665.967 148.065V57.2018C665.967 48.6949 665.821 41.728 665.529 36.3011C665.238 30.7277 664.873 26.9142 664.435 24.8607C663.707 21.194 662.028 18.7739 659.402 17.6005C656.924 16.4272 652.329 15.8405 645.618 15.8405V8.36027L696.38 0V146.525Z" fill="#F7F6F2"/>
              <path d="M829.516 162.145C816.243 177.253 799.687 184.805 779.848 184.805C770.805 184.805 762.562 183.413 755.123 180.625C747.83 177.693 741.557 173.659 736.305 168.525C731.054 163.245 726.97 157.012 724.052 149.825C721.136 142.638 719.676 134.644 719.676 125.844C719.676 116.75 721.208 108.463 724.271 100.983C727.334 93.3563 731.639 86.8295 737.181 81.4025C742.87 75.8291 749.507 71.5022 757.092 68.4221C764.824 65.342 773.283 63.802 782.473 63.802C797.937 63.802 809.971 67.9821 818.576 76.3424C827.183 84.7026 831.486 96.4364 831.486 111.543C831.486 113.89 831.121 115.357 830.392 115.944C829.663 116.384 827.621 116.604 824.265 116.604H753.81C753.227 117.924 752.935 120.344 752.935 123.864C752.935 138.238 755.998 149.605 762.124 157.965C768.398 166.325 776.858 170.505 787.506 170.505C793.632 170.505 799.687 169.112 805.667 166.325C811.793 163.539 817.701 159.578 823.39 154.445L829.516 162.145ZM787.068 104.283C792.904 104.283 796.624 103.99 798.227 103.403C799.978 102.67 800.853 101.057 800.853 98.5631C800.853 92.1096 799.031 86.8295 795.383 82.7226C791.737 78.6158 787.142 76.5624 781.598 76.5624C775.326 76.5624 769.711 79.2024 764.75 84.4826C759.936 89.6162 756.801 96.2164 755.342 104.283H787.068Z" fill="#F7F6F2"/>
              {/* ® mark path — M842.778 — REQUIRED */}
              <path d="M842.778 8.76C842.778 3.92 846.618 0 851.538 0C856.378 0 860.138 3.84 860.138 8.76C860.138 13.6 856.378 17.52 851.538 17.52C846.618 17.52 842.778 13.6 842.778 8.76ZM858.258 8.76C858.258 4.88 855.298 1.76 851.538 1.76C847.698 1.76 844.658 4.88 844.658 8.76C844.658 12.64 847.698 15.76 851.538 15.76C855.298 15.76 858.258 12.64 858.258 8.76ZM848.978 4.72H852.178C854.178 4.72 855.378 5.6 855.378 7.28C855.378 8.56 854.658 9.36 853.538 9.68L855.618 13.04H853.538L851.698 9.92H850.898V13.04H848.978V4.72ZM851.938 8.4C852.898 8.4 853.458 7.96 853.458 7.2C853.458 6.44 852.898 6.08 851.938 6.08H850.898V8.4H851.938Z" fill="#F7F6F2"/>
              {/* Symbol paths */}
              <path fillRule="evenodd" clipRule="evenodd" d="M140.637 110.346C142.895 101.9 151.61 94.9844 160.062 94.9844H174.605C178.121 94.9844 180.169 97.835 179.277 101.372L171.507 130.457C165.522 152.945 147.882 173.214 125.675 183.561C122.158 185.198 121.475 182.346 122.21 179.655L140.637 110.398V110.346Z" fill="#C15F3C"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M29.4385 147.867L2.71669 101.309C0.721743 97.7725 1.92925 94.9219 5.39416 94.9219H21.1962C29.5961 94.9219 40.4631 101.837 45.3454 110.283L73.6421 159.586C75.6372 163.123 74.4297 165.973 70.9647 165.973H61.8301C48.2329 165.973 36.211 158.689 29.4911 147.815L29.4385 147.867Z" fill="#C15F3C"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M124.251 94.922L60.5178 94.9219C47.9707 94.9219 46.291 98.9339 52.2758 109.28L80.7299 158.847C87.4497 170.566 97.6342 179.065 109.184 183.763C112.439 185.083 115.274 185.399 116.481 180.913L135.013 111.286C137.166 103.157 134.173 94.9748 124.251 94.9748V94.922Z" fill="#C15F3C"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M150.067 36.7488L176.788 83.3066C178.783 86.8434 177.576 89.694 174.111 89.694H158.309C149.909 89.694 139.042 82.7791 134.16 74.333L105.863 25.03C103.868 21.4932 105.076 18.6426 108.541 18.6426H117.675C131.272 18.6426 143.295 25.9272 150.015 36.8014L150.067 36.7488Z" fill="#C15F3C"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M38.8475 74.2918C36.59 82.7379 27.8756 89.6528 19.4232 89.6528H4.88109C1.36369 89.6528 -0.683825 86.8025 0.20865 83.2657L7.97832 54.1801C13.9632 31.6928 31.6028 11.4227 53.8098 1.07644C57.3271 -0.55996 58.0095 2.29049 57.2746 4.98262L38.8475 74.2391V74.2918Z" fill="#C15F3C"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M55.2873 89.7019H119.02C131.515 89.7019 133.248 85.6902 127.263 75.3441L98.8087 25.777C92.089 14.0582 81.904 5.55939 70.3544 0.861353C67.0995 -0.458311 64.2647 -0.774846 63.0572 3.71206L44.5251 73.338C42.3727 81.4673 45.365 89.649 55.2873 89.649V89.7019Z" fill="#C15F3C"/>
            </svg>
            <p className="text-[#6A645E] text-sm leading-[1.7] mt-2">
              Augmented deliberation.<br />
              Engineered for the questions that matter.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-4">Product</div>
            <div className="flex flex-col gap-[11px]">
              <Link href="/how-it-works" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">How it works</Link>
              <Link href="/how-it-works/agents" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Agents + roles</Link>
              <Link href="/how-it-works/guardian" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Guardian system</Link>
              <Link href="/outcomes" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Outcomes</Link>
              <Link href="/index" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Deliberation index</Link>
              <Link href="/pricing" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Pricing</Link>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-4">Solutions</div>
            <div className="flex flex-col gap-[11px]">
              <Link href="/solutions/universities" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Universities</Link>
              <Link href="/solutions/research-labs" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Research labs</Link>
              <Link href="/solutions/law-firms" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Law firms</Link>
              <Link href="/solutions/venture-capital" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Venture capital</Link>
              <Link href="/solutions/healthcare" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Healthcare</Link>
              <Link href="/solutions" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">All solutions →</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-4">Resources</div>
            <div className="flex flex-col gap-[11px]">
              <Link href="/use-cases" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Use cases</Link>
              <Link href="/research" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Research papers</Link>
              <Link href="/blog" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Blog</Link>
              <Link href="/glossary" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Glossary</Link>
              <Link href="/platform" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">API + platform</Link>
              <Link href="/docs" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Documentation</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-4">Company</div>
            <div className="flex flex-col gap-[11px]">
              <Link href="/about" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">About Augle</Link>
              <Link href="/about" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Team</Link>
              <Link href="/research" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Research</Link>
              <Link href="/careers" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Careers</Link>
              <Link href="/contact" className="text-[14px] text-[#B0ADA5] hover:text-white transition-colors no-underline">Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-[0.5px] border-[#49443F] pt-7 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <span className="text-[13px] text-[#6A645E]">© 2026 Augle, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[13px] text-[#6A645E] hover:text-[#B0ADA5] transition-colors no-underline">Privacy</Link>
            <Link href="/terms" className="text-[13px] text-[#6A645E] hover:text-[#B0ADA5] transition-colors no-underline">Terms</Link>
            <Link href="/security" className="text-[13px] text-[#6A645E] hover:text-[#B0ADA5] transition-colors no-underline">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
