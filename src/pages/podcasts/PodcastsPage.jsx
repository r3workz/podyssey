import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getPodcasts } from '../../services/redux/slices/podcastSlice'
import { getEpisodes } from '../../services/redux/slices/episodeSlice'

import InputBox from '../../components/InputBox'
import { PodcastCard as Card } from '../../components/Card'
import { CardWithTextSkeleton } from '../../components/Skeletons'

import './PodcastsPage.css'

const PodcastsPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const podcasts = useSelector((state) => state.podcasts)

	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		dispatch(getPodcasts())
		dispatch(getEpisodes())
	}, [])

	return (
		<main className="podcasts-container">
			<h1>Discover Podcasts</h1>
			<InputBox
				type={'search'}
				name={'search'}
				placeholder={'Search'}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<section className="podcasts">
				<div className="card-grid">
					{podcasts.isLoading
						? Array(8)
								.fill(0)
								.map((_, index) => <CardWithTextSkeleton key={index} />)
						: podcasts.list.length > 0 && // eslint-disable-next-line no-mixed-spaces-and-tabs
						  podcasts.list
								.filter((podcast) => podcast.title.toLowerCase().includes(searchText))
								.sort((a, b) => a.title.localeCompare(b.title))
								.map((podcast) => {
									return (
										<Card
											key={podcast.id}
											cardImage={podcast.thumbnailUrl}
											cardTitle={podcast.title}
											cardSubtitle={podcast.description}
											cardOnClick={() => {
												navigate(`/podcast/${podcast.id}`)
											}}
										/>
									)
								})}
				</div>
			</section>
		</main>
	)
}

export default PodcastsPage
