import React from 'react'
import { SvgProps } from '../types'

const ARBITRUM: React.FC<SvgProps> = ({ width }) => {
  return (
    <svg
      width={width || '30'}
      height={width || '30'}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2197_4778)">
        <g clipPath="url(#clip1_2197_4778)">
          <path
            d="M0.833344 16.6528V13.3736C0.855132 13.3257 0.87221 13.2757 0.884335 13.2244C0.922889 12.9408 0.93657 12.6523 0.996681 12.3737C1.09245 11.9318 1.21433 11.4948 1.33248 11.0579C1.39425 10.8286 1.46514 10.6019 1.54266 10.3764C1.64299 10.0862 1.74124 9.79099 1.8627 9.50577C2.00531 9.17412 2.16285 8.84661 2.32992 8.52574C2.51481 8.17046 2.70302 7.81477 2.91735 7.47814C3.17438 7.07726 3.45297 6.6884 3.74151 6.30949C3.99024 5.98157 4.25888 5.66691 4.53456 5.36097C4.76589 5.10477 5.01546 4.86349 5.26627 4.62719C5.46111 4.44271 5.66798 4.26983 5.8736 4.09696C6.06223 3.9386 6.25003 3.77733 6.45026 3.63472C6.8014 3.38599 7.15502 3.13725 7.52025 2.90758C7.79055 2.73471 8.07079 2.57593 8.35642 2.43C8.74819 2.22977 9.14409 2.03741 9.54705 1.85998C9.82398 1.7381 10.1129 1.64192 10.4002 1.54408C10.702 1.44085 11.0055 1.34219 11.3123 1.25389C11.5643 1.18258 11.8205 1.12454 12.0775 1.07314C12.3072 1.03044 12.5402 1.00017 12.7728 0.966179C12.9626 0.937575 13.1533 0.914774 13.3428 0.88534C13.4137 0.874146 13.4821 0.83725 13.5501 0.836836C14.509 0.834348 15.4674 0.834348 16.4238 0.834348C16.4587 0.83239 16.4937 0.833778 16.5283 0.838494C16.7493 0.87995 16.969 0.924723 17.1916 0.964936C17.5514 1.03044 17.9154 1.07728 18.2695 1.16102C18.6152 1.24394 18.9514 1.36333 19.2938 1.46034C19.8373 1.61373 20.3539 1.83345 20.8692 2.06187C21.4678 2.32888 22.0457 2.64026 22.5979 2.99339C22.9478 3.21519 23.2828 3.46227 23.6115 3.71473C23.9564 3.97923 24.3034 4.24538 24.6177 4.54386C25.0173 4.92402 25.3933 5.33153 25.7644 5.73946C26.019 6.01826 26.2582 6.31068 26.4811 6.61543C26.9471 7.2562 27.3612 7.93312 27.7194 8.63975C27.8525 8.90217 27.9723 9.17163 28.0901 9.44151C28.1705 9.62682 28.2401 9.81711 28.3085 10.0074C28.374 10.1894 28.4329 10.3743 28.493 10.5579C28.5784 10.8162 28.6713 11.072 28.7446 11.3332C28.8155 11.5856 28.869 11.8431 28.9242 12.0997C28.9656 12.2991 29.0042 12.5002 29.0353 12.7016C29.0676 12.9127 29.0875 13.1253 29.1182 13.3367C29.1281 13.4072 29.1667 13.476 29.1667 13.544C29.17 14.5232 29.1707 15.5026 29.1687 16.482C29.1699 16.5168 29.168 16.5517 29.1629 16.5861C29.1215 16.7979 29.0755 17.0085 29.0386 17.2212C28.9888 17.5068 28.9611 17.7966 28.8972 18.0785C28.8292 18.3791 28.7314 18.673 28.6439 18.9686C28.5776 19.1916 28.5142 19.4159 28.4366 19.6319C28.2733 20.0788 28.1199 20.5311 27.9251 20.9647C27.7427 21.371 27.5225 21.7615 27.3007 22.1483C26.9591 22.7436 26.5827 23.3174 26.1358 23.8401C25.7747 24.263 25.4132 24.6862 25.0318 25.0904C24.7854 25.3417 24.5249 25.5788 24.2516 25.8006C23.9465 26.0593 23.6376 26.3147 23.3147 26.5505C23.0137 26.7703 22.6995 26.9738 22.379 27.1645C21.9947 27.3942 21.6075 27.623 21.2037 27.815C20.7568 28.0276 20.2917 28.2059 19.8311 28.3837C19.5103 28.5081 19.1807 28.6101 18.8523 28.7154C18.6641 28.7747 18.4718 28.8215 18.279 28.8638C18.0386 28.9169 17.7969 28.9658 17.5539 29.0048C17.2882 29.0462 17.02 29.0752 16.7534 29.1134C16.7099 29.1248 16.6681 29.1418 16.629 29.1639H13.3498C13.2928 29.1423 13.2342 29.1252 13.1745 29.113C12.9958 29.0906 12.8138 29.0868 12.6355 29.0545C12.3607 29.0039 12.0887 28.9368 11.8155 28.8758C11.5813 28.8232 11.3442 28.7801 11.1141 28.7129C10.86 28.6391 10.6104 28.5471 10.3621 28.4559C9.95664 28.3062 9.54912 28.1611 9.15197 27.9924C8.85763 27.868 8.5749 27.713 8.29258 27.5617C8.01026 27.4103 7.72131 27.2644 7.45724 27.0837C6.96639 26.7499 6.48218 26.4046 6.01539 26.0398C5.63516 25.7465 5.27506 25.4279 4.93752 25.0863C4.50843 24.6441 4.10351 24.1792 3.72451 23.6934C3.36177 23.2202 3.02626 22.7268 2.71961 22.2155C2.45885 21.7851 2.24286 21.3254 2.02604 20.871C1.87638 20.5589 1.74828 20.2363 1.62267 19.9134C1.54681 19.719 1.49582 19.5146 1.43073 19.3156C1.38264 19.1684 1.32543 19.0254 1.28107 18.8766C1.25081 18.7754 1.23962 18.6693 1.21267 18.5669C1.1679 18.3948 1.10198 18.2274 1.07296 18.0532C1.00207 17.6287 0.948592 17.2013 0.88392 16.7756C0.872182 16.7327 0.855194 16.6915 0.833344 16.6528H0.833344ZM6.82047 17.6532C6.81809 17.6502 6.81495 17.6479 6.81138 17.6465C6.80781 17.6451 6.80393 17.6447 6.80015 17.6453C6.80015 17.5711 6.79559 17.4969 6.79518 17.4227C6.79297 15.189 6.79007 12.9554 6.78647 10.7217C6.78647 10.4091 6.91084 10.1952 7.18031 10.0389C9.65249 8.60783 12.123 7.17413 14.5919 5.7378C14.8452 5.59063 15.0927 5.59229 15.3468 5.7378C17.8173 7.1639 20.2887 8.58806 22.7608 10.0103C23.0427 10.172 23.1638 10.3958 23.1638 10.713C23.161 13.0865 23.161 15.46 23.1638 17.8335C23.1638 17.8858 23.1609 17.9384 23.1597 17.9906C23.1315 17.9521 23.1016 17.9152 23.0767 17.875C21.733 15.7787 20.3895 13.6819 19.0464 11.5848C19.019 11.5433 18.99 11.5019 18.9589 11.4542C18.9463 11.4673 18.9345 11.4812 18.9236 11.4957C18.4262 12.3426 17.9258 13.1896 17.4312 14.0394C17.4217 14.0654 17.418 14.0932 17.4204 14.1208C17.4228 14.1483 17.4311 14.175 17.4449 14.199C17.6787 14.5887 17.9192 14.9739 18.1575 15.3598C19.2564 17.1458 20.3561 18.9314 21.4566 20.7168L20.6947 21.1579C20.6864 21.1426 20.6789 21.1268 20.6694 21.1123C19.4127 19.1263 18.1552 17.1402 16.8968 15.1542C16.8764 15.1253 16.8543 15.0976 16.8305 15.0713C16.8065 15.1069 16.7891 15.131 16.7733 15.1571C16.2139 16.1109 15.6543 17.0633 15.0943 18.0143C15.0491 18.0905 15.057 18.1432 15.103 18.2145C15.5394 18.8988 15.975 19.5842 16.4097 20.2707C16.9315 21.0932 17.4528 21.9161 17.9735 22.7395C17.9295 22.7677 17.8868 22.7975 17.8416 22.8224C17.0071 23.3078 16.1709 23.79 15.3389 24.2796C15.1047 24.4172 14.8904 24.4172 14.6545 24.2796C13.6471 23.6917 12.6355 23.1117 11.6248 22.5301C11.5834 22.5065 11.539 22.4887 11.4959 22.4704C11.5187 22.4236 11.5374 22.3755 11.5656 22.3307C12.6965 20.4063 13.8277 18.4822 14.9592 16.5583C15.5454 15.5609 16.127 14.561 16.7132 13.5639C17.2787 12.6021 17.8459 11.6413 18.415 10.6815C18.4353 10.6471 18.4535 10.6118 18.4772 10.5691C17.4573 10.5691 16.4607 10.5691 15.4641 10.5733C15.4189 10.5733 15.3576 10.6247 15.331 10.6682C14.7506 11.6234 14.1711 12.5799 13.5924 13.5378C12.8942 14.6931 12.196 15.8482 11.4976 17.0031C11.066 17.7154 10.6311 18.4255 10.1996 19.1377C9.72365 19.9251 9.24884 20.7127 8.77513 21.5003C8.6433 21.7201 8.51396 21.941 8.3784 22.1711C8.74943 22.3854 9.11259 22.5964 9.4774 22.805C9.92679 23.0624 10.3778 23.3174 10.8276 23.5736C10.8455 23.586 10.8625 23.6001 10.8811 23.6109C11.7932 24.1374 12.7023 24.6659 13.6172 25.1862C13.9903 25.3989 14.3452 25.6447 14.7971 25.6866C15.1515 25.7193 15.489 25.6804 15.792 25.5083C16.7493 24.9657 17.699 24.4081 18.6496 23.8559C20.092 23.0185 21.5341 22.1806 22.976 21.3424C23.2438 21.1865 23.5282 21.0501 23.7703 20.8607C24.2574 20.4793 24.4784 19.9486 24.4792 19.3384C24.485 16.4398 24.485 13.5411 24.4792 10.6425C24.4765 10.4527 24.4486 10.2641 24.3963 10.0816C24.3314 9.84019 24.219 9.6142 24.0655 9.41691C23.912 9.21963 23.7206 9.05505 23.5025 8.93284C22.8164 8.53155 22.1261 8.13771 21.438 7.74056C19.6299 6.69779 17.822 5.65489 16.0142 4.61185C15.421 4.26859 14.8058 4.2118 14.1765 4.48375C13.9277 4.59029 13.7026 4.74451 13.4688 4.88007C12.1806 5.62629 10.8929 6.37374 9.6055 7.12244C8.57822 7.71831 7.55051 8.31349 6.5224 8.90797C5.845 9.29932 5.48599 9.88302 5.48599 10.667C5.48184 13.0018 5.48184 15.3372 5.48599 17.6731V19.7289C5.4835 19.9644 5.4777 20.2003 5.48184 20.4361C5.48621 20.4574 5.495 20.4774 5.50764 20.495C5.52029 20.5125 5.5365 20.5273 5.55522 20.5381C5.87402 20.7263 6.19572 20.9112 6.51618 21.0957L7.56046 21.6997L14.4775 10.5766C14.1769 10.5633 13.8946 10.5451 13.6123 10.5389C13.0344 10.526 12.4585 10.5347 11.9026 10.7238C11.4006 10.895 10.979 11.169 10.7004 11.6358C10.5689 11.8555 10.4243 12.0674 10.2858 12.2825C9.41715 13.6326 8.54851 14.9822 7.67986 16.3311C7.39505 16.7731 7.10693 17.2125 6.82047 17.6532Z"
            fill="#2D374B"
          />
          <path
            d="M11.4959 22.4721C11.5374 22.492 11.5838 22.5082 11.6248 22.5318C12.6355 23.1122 13.6471 23.6926 14.6545 24.2812C14.8904 24.4185 15.1047 24.4185 15.3389 24.2812C16.1709 23.7916 17.0071 23.3095 17.8416 22.8241C17.8868 22.7979 17.9295 22.7681 17.9735 22.7411C18.4904 22.4439 19.0099 22.1479 19.5239 21.8482C19.9157 21.621 20.3045 21.3892 20.6947 21.1596L21.4566 20.7185C21.9209 20.4511 22.384 20.182 22.8504 19.9176C22.944 19.8691 23.0224 19.7956 23.0766 19.7051C23.1309 19.6147 23.1589 19.511 23.1576 19.4056C23.1642 18.935 23.1576 18.4645 23.1576 17.9936C23.1576 17.9413 23.1617 17.8887 23.1617 17.8364V10.7159C23.1617 10.3988 23.0407 10.177 22.7588 10.0132C20.2866 8.59237 17.8159 7.16765 15.3468 5.73907C15.0927 5.59231 14.8452 5.59066 14.5919 5.73907C12.1219 7.17318 9.65137 8.60605 7.1803 10.0377C6.90959 10.194 6.78522 10.4079 6.78647 10.7205C6.79255 12.9541 6.79545 15.1878 6.79517 17.4215C6.79517 17.4957 6.79849 17.5699 6.80015 17.6441L6.81424 17.6777C6.55597 18.0806 6.29935 18.4848 6.03901 18.8865C5.86821 19.1494 5.69202 19.4085 5.51832 19.6692L5.48557 19.6647V10.6649C5.48557 9.88097 5.84458 9.29685 6.52197 8.90592C7.55009 8.31143 8.57779 7.71626 9.60508 7.12039C10.8927 6.37418 12.1805 5.62672 13.4684 4.87802C13.7022 4.74246 13.929 4.58783 14.1761 4.4817C14.8054 4.20975 15.4197 4.26654 16.0138 4.6098C17.8202 5.65643 19.628 6.70044 21.4371 7.74182C22.1253 8.13898 22.8156 8.53281 23.5017 8.93411C23.7197 9.05631 23.9111 9.2209 24.0646 9.41818C24.2181 9.61546 24.3306 9.84146 24.3955 10.0829C24.4478 10.2653 24.4756 10.454 24.4784 10.6438C24.4833 13.5424 24.4833 16.441 24.4784 19.3396C24.4784 19.9499 24.2566 20.4805 23.7695 20.8619C23.5274 21.0514 23.243 21.1878 22.9752 21.3436C21.5352 22.1824 20.0934 23.0203 18.6496 23.8571C17.6961 24.4093 16.7493 24.9669 15.792 25.5096C15.4881 25.6816 15.1507 25.7206 14.7971 25.6879C14.3452 25.6464 13.9895 25.4002 13.6172 25.1875C12.7031 24.666 11.7931 24.1374 10.8811 23.6121C10.8625 23.6014 10.8455 23.5873 10.8276 23.5748C11.0084 23.2664 11.1879 22.9571 11.3699 22.6499C11.4068 22.5865 11.4536 22.531 11.4959 22.4721Z"
            fill="#95BDDB"
          />
          <path
            d="M11.4959 22.4721C11.4545 22.531 11.4068 22.5865 11.3715 22.6487C11.1895 22.9559 11.01 23.2652 10.8293 23.5736C10.3795 23.3174 9.92844 23.0624 9.47906 22.805C9.11424 22.5977 8.75108 22.3854 8.38005 22.1711C8.51561 21.941 8.64496 21.7201 8.77679 21.5004C9.25105 20.713 9.72586 19.926 10.2012 19.1394C10.6328 18.4272 11.0677 17.717 11.4992 17.0048C12.1987 15.8501 12.897 14.695 13.594 13.5395C14.1727 12.5827 14.7523 11.6261 15.3327 10.6699C15.3592 10.6264 15.4206 10.5754 15.4658 10.575C16.4607 10.5696 17.459 10.5708 18.4788 10.5708C18.4552 10.6123 18.4374 10.6487 18.4166 10.6832C17.8495 11.6438 17.2822 12.6047 16.7148 13.5656C16.1287 14.5606 15.547 15.5626 14.9608 16.56C13.8293 18.4855 12.6976 20.4096 11.5656 22.3324C11.539 22.3772 11.5187 22.4252 11.4959 22.4721ZM5.5179 19.6705C5.69161 19.4097 5.8678 19.1506 6.0386 18.8878C6.29894 18.4861 6.55556 18.0819 6.81383 17.6789L6.82005 17.6532C7.10651 17.2125 7.39463 16.7731 7.67944 16.3312C8.54919 14.9822 9.41784 13.633 10.2854 12.2838C10.4238 12.0686 10.5685 11.8568 10.6999 11.6371C10.9794 11.1707 11.401 10.8967 11.9022 10.725C12.4581 10.536 13.0339 10.5273 13.6118 10.5401C13.8942 10.5463 14.1765 10.5646 14.477 10.5779L7.56004 21.6989L6.51576 21.0949C6.1953 20.9096 5.8736 20.7255 5.5548 20.5373C5.53608 20.5264 5.51987 20.5117 5.50722 20.4942C5.49458 20.4766 5.48579 20.4565 5.48142 20.4353C5.47728 20.1995 5.48142 19.9636 5.48557 19.7281L5.5179 19.6705Z"
            fill="#FEFEFE"
          />
          <path
            d="M23.1576 17.9919C23.1576 18.4629 23.1642 18.9334 23.1576 19.4039C23.1589 19.5093 23.1309 19.6131 23.0766 19.7035C23.0224 19.7939 22.9441 19.8675 22.8504 19.9159C22.384 20.1804 21.921 20.4494 21.4566 20.7168L18.1555 15.3615C17.9171 14.9747 17.6767 14.5896 17.4428 14.2007C17.4291 14.1767 17.4207 14.15 17.4183 14.1224C17.416 14.0949 17.4197 14.0671 17.4292 14.0411C17.9229 13.1913 18.4241 12.3443 18.9216 11.4974C18.9325 11.4828 18.9443 11.469 18.9568 11.4559C18.9879 11.5023 19.0169 11.5438 19.0443 11.5865C20.3875 13.6831 21.7309 15.7798 23.0747 17.8767C23.0996 17.9165 23.1294 17.9534 23.1576 17.9919ZM20.6947 21.1579C20.3046 21.3876 19.9157 21.6193 19.5239 21.8465C19.0082 22.1462 18.4904 22.4422 17.9735 22.7395C17.4525 21.9167 16.9313 21.0938 16.4097 20.2708C15.975 19.5842 15.5387 18.8988 15.101 18.2145C15.055 18.1432 15.0471 18.0902 15.0923 18.0143C15.6552 17.0633 16.2161 16.111 16.775 15.1575C16.7899 15.1314 16.8081 15.1074 16.8322 15.0717C16.8559 15.098 16.8781 15.1257 16.8985 15.1546C18.156 17.1404 19.4135 19.1264 20.671 21.1127C20.6789 21.1268 20.6864 21.1426 20.6947 21.1579Z"
            fill="#289FEF"
          />
          <path d="M5.51792 19.6705L5.48517 19.7281V19.6659L5.51792 19.6705Z" fill="#718EA9" />
          <path
            d="M6.82045 17.6532L6.81424 17.6789L6.80014 17.6453C6.80392 17.6447 6.8078 17.6451 6.81137 17.6465C6.81494 17.6479 6.81807 17.6502 6.82045 17.6532Z"
            fill="#4D627A"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2197_4778">
          <rect width="30" height="30" fill="white" />
        </clipPath>
        <clipPath id="clip1_2197_4778">
          <rect width="28.3333" height="28.3333" fill="white" transform="translate(0.833344 0.833336)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ARBITRUM