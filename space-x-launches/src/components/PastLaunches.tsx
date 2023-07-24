import LaunchDataTableComponent from "./LaunchDataTableComponent";

export default function PastLaunches() {
    const pastLaunchesUrl = 'http://localhost:5204/api/v1/Launches/past';
      
    return (
        <div>
            <LaunchDataTableComponent url={pastLaunchesUrl} upcoming={false} />
        </div>
    );
}