import LaunchDataTableComponent from "./LaunchDataTableComponent";

export default function UpcomingLaunches() {
    const pastLaunchesUrl = 'http://localhost:5204/api/v1/Launches/upcoming';
      
    return (
        <div>
            <LaunchDataTableComponent url={pastLaunchesUrl} upcoming={true} />
        </div>
    );
}