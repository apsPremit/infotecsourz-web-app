export const getPlan = async () => {
    const response = await fetch('../json/plan.json')
    const plans = await response.json()
    return plans

}