import { useEffect, useState, useRef, MutableRefObject } from 'react';
import leaflet, { Map, TileLayer } from 'leaflet';
import { DEFAULT_SAINT_PETERSBURG_COORDS } from '../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>, zoom: number
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: DEFAULT_SAINT_PETERSBURG_COORDS.latitude,
          lng: DEFAULT_SAINT_PETERSBURG_COORDS.longitude,
        },
        zoom: zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, zoom]);

  return map;
}

export default useMap;
