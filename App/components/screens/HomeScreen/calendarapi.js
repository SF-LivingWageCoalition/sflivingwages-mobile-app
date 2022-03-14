const url =
    "https://www.googleapis.com/calendar/v3/calendars/${sflivingwage@gmail.com}/events?key=${AIzaSyCIoCMg5K_SolRd3kn7hEUwniAJtQ7S0GM}"

export async function getCal() {
    let result = await fetch(url).then(response => response.json());
    return result.calendars;
}