import { TextEncoder, TextDecoder } from 'util'
import React from 'react'
import '@testing-library/jest-dom'

global.React = React
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
