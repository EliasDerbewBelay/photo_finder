from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="photo_finder")

def get_city_country(latitude, longitude):
    try:
        location = geolocator.reverse((latitude, longitude), exactly_one=True);

        if not location:
            return None, None
        
        address = location.raw.get('address', {})

        city = (
            address.get("city") or
            address.get("town") or 
            address.get("village") or
            address.get("hamlet") or "")
        
        country = address.get("country", "")

        return city, country
    except Exception:
        return None, None
    