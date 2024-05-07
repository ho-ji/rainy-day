# Rainy Day

Rainy Day는 여러 장소에서의 날씨 정보를 한번에 확인하기 위해 반응형 웹페이지로 제작되었습니다. 사용자는 현재 위치의 날씨 정보를 확인하고 장소를 추가해서 추가된 장소의 날씨정보를 한 눈에 확인 할 수 있습니다.

[페이지 링크](https://rainy-day.o-r.kr)

<br/>

## 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/scss-cc6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">

<br/>

## 구현 기능

### 1. 날씨정보

- **기상청 API**로부터 원하는 장소의 날씨정보를 가져와 시간대별 날씨 정보 표시
- 날씨 이미지는 Image Sprite기법을 사용해 성능 최적화

<br/>

### 2. 장소

- **네이버 지도 API**를 사용하여 현재위치와 사용자가 추가한 장소에 대한 위치를 지도로 표기
- **카카오 지도 웹 API**를 사용하여 사용자가 장소를 검색하고 추가할 수 있음
- 추가된 장소는 로컬 스토리지에 저장되며, 삭제도 가능

<br/>
