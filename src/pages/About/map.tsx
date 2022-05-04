import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import mapStyle from './mapStyle';
import LocationIcon from '../../icons/locationIcon';
import { PhoneOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import SizedBox from '../../components/sized-box';


interface IMarker {
  name: string,
  address: string,
  lat: number,
  lng: number,
  phone: string
}

const containerStyle = {
  width: '100%',
  height: '80vh'
};

const center = {
  lat: 42.340782,
  lng: 69.596329
};

const markers: IMarker[] = [
  {
    name: '«Дефиле Люкс»',
    address: 'Г.Иляева 4',
    lat: 42.322134,
    lng: 69.585113,
    phone: '+7 (7252) 21-41-51'
  },
  {
    name: '«Дефиле» — Кунаева',
    address: 'бульвар Кунаева б/н',
    lat: 42.327250,
    lng: 69.600130,
    phone: '+7 (7252) 39-32-88'
  },
  {
    name: '«Дефиле» пр.Республики ',
    address: 'пр.Республики 2',
    lat: 42.321216,
    lng: 69.587215,
    phone: '+7 (7252) 33-86-96'
  },
  {
    name: '«Дефиле ЦУМ» ',
    address: 'ТД Шымкент, 2 этаж,238 б.',
    lat: 42.320707,
    lng: 69.595852,
    phone: '+7 (7252) 53-71-55'
  },
  {
    name: '«Дефиле» — ТЦ «Hyper House»',
    address: 'ТЦ Hyper House, 3 этаж, 318 б.',
    lat: 42.347771,
    lng: 69.614218,
    phone: '+7 (7252) 52-13-92'
  }
]

function MapComponent() {

  const [icon, setIcon] = useState();
  const [activeIcon, setActiveIcon] = useState();
  const [content, setContent] = useState<IMarker | undefined>(undefined);

  const onClick = () => {
    console.info('I have been clicked!')
  };

  const onClickMarker = (marker: IMarker) => {
    setContent(marker);
    console.log(marker);
  }

return (
  <LoadScript
    googleMapsApiKey="AIzaSyBUVRGCl79p01aB2YhioP6s3bURSLV0qDE"
  >
    <GoogleMap
      onClick={() => setContent(undefined)}
      onLoad={() => {
        // @ts-ignore: Unreachable code error
        const iconMarker = new window.google.maps.MarkerImage(
          require('../../static/images/icon.png'),
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new window.google.maps.Size(40, 40)
        );
         // @ts-ignore: Unreachable code error
        const activeIconMarker = new window.google.maps.MarkerImage(
          require('../../static/images/active-icon.png'),
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new window.google.maps.Size(40, 40)
        );
        setIcon(iconMarker);
        setActiveIcon(activeIconMarker)
      }}
      mapContainerStyle={containerStyle}
      center={center}
      options={{
        disableDefaultUI: true,
        styles: mapStyle
      }}
      zoom={12}
    >
      <>
        {content !== undefined ? <InfoWindow
          zIndex={9000}
          position={{
            lat: content?.lat,
            lng: content?.lng
          }}
          options={{
            pixelOffset: new window.google.maps.Size(0, -20)
          }}
          onCloseClick={() => { setContent(undefined) }}
        >
          <div className='infobox-content'>
            <Row className='infobox-item'>
              <div className='infobox-title'>{content?.name}</div>
            </Row>
            <Row align='middle' className='infobox-content-item'>
              <LocationIcon />
              <SizedBox width={10}></SizedBox>
              <div className='infobox-content-title'><span>Адрес:</span> {content?.address}</div>
            </Row>
            <Row align='middle' className='infobox-content-item'>
              <PhoneOutlined style={{
                color: '#FF0303',
                fontSize: 18
              }} />
              <SizedBox width={10}></SizedBox>
              <div className='infobox-content-title'><span>Телефон:</span> {content?.phone}</div>
            </Row>
            {/* <Button onClick={()=>openMapOnPhone(content)} type='primary'>Дойти</Button> */}
          </div>
        </InfoWindow> : ('')}
        {markers.map((marker) => (
          <div key={marker.name}>
            <Marker
              icon={marker?.name == content?.name ? activeIcon : icon}
              zIndex={marker?.name == content?.name ? 101 : 100}
              onClick={() => onClickMarker(marker)}
              position={{
                lat: marker.lat,
                lng: marker.lng
              }}>
            </Marker>
          </div>
        ))}
      </>
    </GoogleMap>
  </LoadScript>
)
}

export default React.memo(MapComponent);