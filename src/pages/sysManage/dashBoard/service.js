import fetch from '@/config/fetch'

export const getTree = () => fetch('/ftyenterprise/getDashboardTree', {}, "GET");