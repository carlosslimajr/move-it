import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { ChallengeBox } from '../componets/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { CompletedChallenges } from '../componets/CompletedChallenges';
import { Countdown } from '../componets/Countdown';
import { ExperienceBar } from '../componets/ExperienceBar';
import { Profile } from '../componets/Profile';
import styles from '../styles/pages/Home.module.css'
import React from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContext';


interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number

}

export default function Home(props) {

  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início - Move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>

          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//Method called inside node ! , everthing here is in the next/back.end
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  //All of the cookies here
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
