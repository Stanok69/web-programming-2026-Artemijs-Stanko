import type { CurrentWeather, LoadState } from "../types";
import { describeWeather } from "../weather";
import StatCard from "./StatCard";

interface WeatherCardProps {
  weather: LoadState<CurrentWeather>;
}

function WeatherCard({ weather }: WeatherCardProps) {
  switch (weather.status) {
    case "loading":
      return <StatCard index="04" label="Rīga now" value="…" note="Loading weather…" />;
    case "error":
      return (
        <StatCard
          index="04"
          label="Rīga now"
          value="–"
          note="Weather unavailable"
          tone="danger"
        />
      );
    case "success": {
      const current = weather.data;

      return (
        <StatCard
          index="04"
          label="Rīga now"
          value={`${Math.round(current.temperature)}°C`}
          note={`${describeWeather(current.weatherCode)} · ${Math.round(current.windSpeed)} km/h`}
        />
      );
    }
    default: {
      const check: never = weather;
      return check;
    }
  }
}

export default WeatherCard;
