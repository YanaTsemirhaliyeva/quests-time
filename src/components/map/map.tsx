import { Marker, layerGroup } from 'leaflet';
import { useCallback, useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import { BookingLocation, Bookings } from '../../types/booking';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PageMapClass, PageMapZoom, activeCustomIcon, defaultCustomIcon } from '../../const';
import { getCurrentQuest } from '../../store/bookings/bookings.selectors';
import { changeQuestAddress } from '../../store/bookings/bookings.slice';

type MapProps = {
  page: string;
  bookingQuests?: Bookings[];
  contacts?: BookingLocation;
}


function Map({page, contacts, bookingQuests}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const dispatch = useAppDispatch();
  let currentQuest = useAppSelector(getCurrentQuest);

  if (!currentQuest && bookingQuests) {
    currentQuest = bookingQuests[0];
  }

  const currentZoom = page === PageMapClass.Bookings ? PageMapZoom[PageMapClass.Bookings] : PageMapZoom[PageMapClass.Contacts];

  const map = useMap(mapRef, currentZoom);

  const handleMarkerClick = useCallback((questPlace: Bookings): void => {
    dispatch(changeQuestAddress(questPlace));
  }, [dispatch]);


  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      if (contacts) {
        const marker = new Marker([
          contacts.location.coords[0],
          contacts.location.coords[1]
        ], {
          title: contacts.location.address,
          icon: activeCustomIcon
        });
        marker
          .addTo(markerLayer)
          .bindPopup('<h1>Escape Room</h1><a href="tel:88005558628">8 (000) 111-11-11</a>').openPopup();
      }


      if (bookingQuests) {
        bookingQuests?.forEach((item) => {
          const {location: {coords, address}} = item;

          const marker = new Marker([
            coords[0],
            coords[1]
          ], {
            title: address
          });

          marker
            .setIcon(currentQuest && item.location.address === currentQuest.location.address ? activeCustomIcon : defaultCustomIcon)
            .addTo(markerLayer)
            .bindPopup(`<h1>Escape Room</h1><p>${address}</p><a href="tel:88005558628">8 (800) 555-86-28</a>`)
            .on('click', () => {
              handleMarkerClick(item);
            });
        });
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [bookingQuests, contacts, currentQuest, handleMarkerClick, map]);

  const currentAddress = bookingQuests?.find((item) => currentQuest?.id === item.id)?.location.address;


  return (
    <>
      <div className="map">
        <div className="map__container" ref={mapRef}></div>
      </div>
      {bookingQuests && page === PageMapClass.Bookings &&
      <p className="booking-map__address">Вы&nbsp;выбрали: {currentAddress}</p>}
    </>);
}

export default Map;
