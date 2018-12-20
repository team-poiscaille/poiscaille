# Poiscaille

> Gene-based Real Time Strategy Game

[![js-happiness-style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

## 목적

상대의 모든 세포를 제거해라

## 규칙

- 각 플레이어는 일정 영양분(코스트)와 일반 세포, 하나의 생산세포을 가지고 시작함
- 생산세포에서 영양분을 이용해 일반 세포를 생산할 수 있음
- 영양분을 이용해 생산세포의 DNA를 수정할 수 있음. DNA 수정은 일반 세포 생산에 반영됨
- 영양분은 맵에서 채취하거나 상대 세포를 죽여서 얻을 수 있음
- 일반세포는 원거리 공격과 근접 공격을 할 수 있음. 원거리 공격은 회당 세포 hp의 1/5을 소모함
- 일반세포와 생산세포는 가만히 있으면 hp를 조금씩 회복함
- 개인의 모든 세포가 죽으면 그 플레이어가 게임오버

## 조작

- 일반 세포는 사람이 공격위치 찍어줘야 이동함. 적이 반경안에 들어오면 자동으로 달려들어 공격(근접 공격)함
- 생산 세포도 이동할 수 있으나 공격은 할 수 없음

## License

```text
Copyright (c) 2018 Project Poiscaille

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

poiscaille is licensed under the [MIT License](./LICENSE).
