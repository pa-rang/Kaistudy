import React from "react"
import Loadable from "react-loadable"

export const HomePage = Loadable({
    loader: () => import("./HomePage"),
    loading: "Loading"
})

